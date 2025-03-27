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


function ingresarNombre() {
    return new Promise((resolve) => {
        rl.question('Nombre: ', (nombre) => {
            resolve(nombre)
        })
    })
}

function ingresarNotas() {
    return new Promise((resolve) => {
        let notas = []
        let contador = 1

        const pedirNota = () => {
            rl.question(`Nota ${contador}: `, (nota) => {
                notas.push(parseFloat(nota))
                contador++

                if (contador <= 4) {
                    pedirNota()
                } else {
                    resolve(notas)
                }
            })
        }

        pedirNota()
    });
}

function calcularPromedio(notas) {
    const suma = notas.reduce((acc, nota) => acc + nota, 0)
    return suma / notas.length
}

async function registrarEstudiantes() {
    const cantidad = parseInt(await new Promise((resolve) => {
        rl.question('¿Cuántos estudiantes desea registrar? ', (cantidad) => {
            resolve(cantidad)
        })
    }))

   
    for (let i = 0; i < cantidad; i++) {
        console.log (chalk.blue(`Estudiante ${i + 1}:`))
        const nombre = await ingresarNombre();
        const notas = await ingresarNotas();
        const promedio = calcularPromedio(notas);

        nombres.push(nombre)
        promedios.push(promedio)

        if (promedio >= 7) {
            aprobados.push(nombre)
        } else {
            reprobados.push(nombre)
        }
    }

    console.log("+=====================================================================================================+")


    console.log('\nReporte de Calificaciones:')
    for (let i = 0; i < cantidad; i++) {
        const estado = promedios[i] >= 7 ? '✅ Aprobado' : '❌ Reprobado'
        const color = promedios[i] >= 7 ? chalk.green : chalk.red; 
        console.log(`${nombres[i]}: [${color(promedios[i].toFixed(2))}] - Promedio: ${color(promedios[i].toFixed(2))} ${estado}`)
    }

    console.log(chalk.yellow('\nResumen general:'))
    console.log(`${aprobados.length} estudiante(s) aprobado(s): ${chalk.green(aprobados.join(', '))}`)
    console.log(`${reprobados.length} estudiante(s) reprobado(s): ${chalk.red(reprobados.join(', '))}`)

    rl.close()
}

registrarEstudiantes()
