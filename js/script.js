
function MostrarProductos(productos) {
    let stringTotal = ''
    let opcion = ''
    do {
        stringTotal = '';
        productos.forEach(producto => {
            stringTotal += `${producto.id})${producto.nombre} : $${producto.precio}, cantidad: ${producto.cantidad}\n`
        });

        opcion = prompt(stringTotal + '\nPor favor ingrese una opción para agregar al carrito o pulse F para filtrar, pulse 0 para volver.');
    
        if (opcion.toLowerCase() === 'f') {
            productos = FiltrarBusqueda(productos);
        } 
        else if (isNaN(Number(opcion)) && opcion !== 'f') {
            alert('Opción inválida. Por favor, ingrese una opción válida.');
        }
        else{
            opcion = Number(opcion)
        }
    } while (typeof opcion == "string");

    return opcion
}

function AgregarProducto(carro, opcionId, prod){
    if (prod[opcionId-1].cantidad == 0){
        return false
    }
    else {
        prod[opcionId-1].cantidad -= 1 
        if (!prod[opcionId-1].enCarrito) {
            prod[opcionId-1].enCarrito =true
            let producto = {}
            producto.id = opcionId
            producto.nombre = prod[opcionId-1].nombre
            producto.cantidad = 1
            producto.precioUnitario = prod[opcionId-1].precio
            producto.precioTotal = prod[opcionId-1].precio
            carro.push(producto)
        }
        else{
            let indice = carro.findIndex((p) => p.id === opcionId)
            carro[indice].cantidad++
            carro[indice].precioTotal *= carro[indice].cantidad
        }
        return true
    }
        
} 

function QuitarProducto(carrito, productoId, productosOriginal) {
    
    let index = carrito.findIndex((p) => p.id === productoId)
    let productosFiltrados = []
    productosOriginal[productosOriginal.findIndex((pr) => pr.id === productoId)].cantidad++
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--
        carrito[index].precioTotal -= carrito[index].precioUnitario
        productosFiltrados = carrito
    }
    else{
        productosFiltrados = carrito.filter((producto) => producto.id !== productoId);
    }
    
    return productosFiltrados;
}

function FiltrarBusqueda(prod) {
    let categoria = Number(prompt("Por favor ingrese por que Categoria filtrar:\n1)Celulares\n2)Televisores\n3)Audio\n4)Laptops"))
    if (categoria === 1) {
        prod = prod.filter((p) => p.categoria === "celular")
    }
    else if (categoria === 2) {
        prod = prod.filter((p) => p.categoria === "tv")
    }
    else if (categoria === 3) {
        prod = prod.filter((p) => p.categoria === "audio")
    }
    else if (categoria === 4) {
        prod = prod.filter((p) => p.categoria === "computadora")
    }
    return prod
}

function SumarTotalCarro(carro) {
    let total = carro.reduce((acum,prod) => acum + prod.precioTotal,0)
    return total
}

function MostrarCarro(arr) {
    let stringtotal = ''
    let precioTotalDelCarro = SumarTotalCarro(arr)
    arr.forEach((p)=>{
        stringtotal += `${p.id})${p.nombre}, Precio Total: $${p.precioTotal}, cantidad = ${p.cantidad}\n`
    })
    
    return stringtotal + `\nEl total del carrito es: $${precioTotalDelCarro}` 
}

function VerCarrito(carro){
    if (carro.length === 0) {
        alert("Su carrito aun esta vacio!")
        return false
    }
    else{
        let opcion = prompt(MostrarCarro(carro) + "\nSi quiere sacar productos de su carrito presione X, para volver presione 0")
        if (opcion.toLowerCase() === "x") {
            return true
        }
        else {
            return false
        }
    }
}

function main() {
    let on = true
    let opcion
    let carrito = []
    let productos = [
    {id:1,nombre:"Celular Samsung Galaxy S23+",cantidad:7,categoria:"celular",precio:400000,enCarrito:false},
    {id:2,nombre:"Celular Samsung Galaxy A54 5G",cantidad:6,categoria:"celular",precio:200000,enCarrito:false},
    {id:3,nombre:"Celular Iphone 14 Pro Max",cantidad:10,categoria:"celular",precio:700000,enCarrito:false},
    {id:4,nombre:"Celular Iphone 13 Pro Max",cantidad:4,categoria:"celular",precio:550000,enCarrito:false},
    {id:5,nombre:"Televisor Philips 50' 4K UHD",cantidad:5,categoria:"tv",precio:130000,enCarrito:false},
    {id:6,nombre:"Televisor Samsung 55' 4K UHD",cantidad:7,categoria:"tv",precio:180000,enCarrito:false},
    {id:7,nombre:"Notebook Asus Intel I7",cantidad:3,categoria:"computadora",precio:300000,enCarrito:false},
    {id:8,nombre:"Notebook Lenovo Ryzen 5",cantidad:2,categoria:"computadora",precio:280000,enCarrito:false},
    {id:9,nombre:"Notebook Dell Ryzen 5",cantidad:14,categoria:"computadora",precio:350000,enCarrito:false},
    {id:10,nombre:"Celular Motorola G42 ",cantidad:1,categoria:"celular",precio:90000,enCarrito:false},
    {id:11,nombre:"Televisor TCL 75' 8K",cantidad:15,categoria:"tv",precio:800000,enCarrito:false},
    {id:12,nombre:"Equipo de Musica LG",cantidad:9,categoria:"audio",precio:200000,enCarrito:false},
    ]

    while (on) {
        opcion = Number(prompt("Bienvenidos a Qelectronics, seleccione una opcion:\n1)Ver todos los productos\n2)Ver carrito\n3)Salir"))
        if (opcion === 3) {
            on = false
        }
        else if (opcion === 1) { 
            let opcionProductos = ''  
            while (opcionProductos !== 0) {
                let copia = productos.slice()
                opcionProductos = MostrarProductos(copia)
                if (opcionProductos !== 0) {
                    let sepudo = AgregarProducto(carrito,opcionProductos,productos) 
                    if (sepudo) {
                        let seguir = prompt("Hecho!, Deseas seguir agregando mas? s/n")
                        if (seguir.toLowerCase() === "n") {
                            opcionProductos = 0
                        }
                    }
                    else {
                        alert("Lo sentimos, no hay mas stock de este producto")
                    }
                }
            }                 
        } 
        else if (opcion === 2) {
            let opcion = VerCarrito(carrito)
            if (opcion){
                let string = MostrarCarro(carrito)
                let id = Number(prompt(string + "\nIngrese el ID del producto que desea eliminar"))
                carrito = QuitarProducto(carrito, id, productos) 
                alert("Producto eliminado")
            }
        }
        else {
            if ((opcion < 1 || opcion > 3) || isNaN(opcion)) {
                alert("Opcion no valida vuelva a intentarlo")
            }     
        }
    }
}

main()

