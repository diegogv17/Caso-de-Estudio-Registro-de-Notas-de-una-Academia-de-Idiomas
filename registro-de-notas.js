const readline = require('readline')
const chalk = require('chalk')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let nombres = []
let promedios = []
let aprobados = []
let reprobados = []

function preguntar(pregunta) {
    return new Promise((resolve) => {
        rl.question(pregunta, (respuesta) => {
            resolve(respuesta)
        })
    })
}

async function ingresarNombre() {
    const nombre = await preguntar('Nombre: ')
    return nombre.trim()
}

async function ingresarNotas() {
    let notas = []

    for (let i = 1; i <= 4; i++) {
        let notaValida = false
        let nota
        while (!notaValida) {
            const entrada = await preguntar(`Nota ${i}: `)
            nota = parseFloat(entrada)
            if (!isNaN(nota) && nota >= 0 && nota <= 10) {
                notaValida = true
            } else {
                console.log(chalk.red('⚠️  Ingrese una nota válida entre 0 y 10.'))
            }
        }
        notas.push(nota)
    }

    return notas
}

function calcularPromedio(notas) {
    const suma = notas.reduce((acc, nota) => acc + nota, 0)
    return suma / notas.length
}

async function registrarEstudiantes() {
    const entradaCantidad = await preguntar('¿Cuántos estudiantes desea registrar? ')
    const cantidad = parseInt(entradaCantidad)

    if (isNaN(cantidad) || cantidad <= 0) {
        console.log(chalk.red('❌ Cantidad inválida. Debe ser un número mayor que 0.'))
        rl.close()
        return
    }

    for (let i = 0; i < cantidad; i++) {
        console.log(`\nEstudiante ${i + 1}:`)
        const nombre = await ingresarNombre()
        const notas = await ingresarNotas()
        const promedio = calcularPromedio(notas)

        nombres.push(nombre)
        promedios.push(promedio)

        if (promedio >= 7) {
            aprobados.push(nombre)
        } else {
            reprobados.push(nombre)
        }
    }

    console.log("\n+=====================================================================================================+")
    console.log('\n📋 Reporte de Calificaciones:')
    for (let i = 0; i < cantidad; i++) {
        const estado = promedios[i] >= 7 ? '✅ Aprobado' : '❌ Reprobado'
        const color = promedios[i] >= 7 ? chalk.green : chalk.red
        console.log(`${nombres[i]}: Promedio: ${(promedios[i].toFixed(2))} ${estado}`)
    }

    console.log('\n📊 Resumen general:')
    console.log(`${aprobados.length} estudiante(s) aprobado(s): ${(aprobados.join(', ') || 'Ninguno')}`)
    console.log(`${reprobados.length} estudiante(s) reprobado(s): ${(reprobados.join(', ') || 'Ninguno')}`)

    rl.close()
}

registrarEstudiantes()
