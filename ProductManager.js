const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
    this.nextId = 1;
    this.products = [];

    // Cargar los productos desde el archivo en la ruta indicada
    try {
        const data = fs.readFileSync(this.path, 'utf-8');
        this.products = JSON.parse(data);
    // Establecer el siguiente ID disponible
        if (this.products.length > 0) {
        const lastProduct = this.products[this.products.length - 1];
        this.nextId = lastProduct.id + 1;
        }
    } catch (err) {
      console.log('Error al leer el archivo de productos', err);
    }
  }

  addProduct(product) {
    // Agregar un nuevo producto con el ID siguiente
    product.id = this.nextId++;
    this.products.push(product);
    // Guardar los cambios en el archivo
    this.saveToFile();
    return product;
  }

  getProductById(id) {
    // Buscar un producto por su ID
    const product = this.products.find(p => p.id === id);
    return product;
  }

  getAllProducts() {
    // Devolver todos los productos
    return this.products;
  }

  updateProduct(product) {
    // Actualizar un producto existente por su ID
    const index = this.products.findIndex(p => p.id === product.id);
    if (index >= 0) {
      this.products[index] = product;
      // Guardar los cambios en el archivo
      this.saveToFile();
      return product;
    }
    return null;
  }

  deleteProductById(id) {
    // Eliminar un producto por su ID
    const index = this.products.findIndex(p => p.id === id);
    if (index >= 0) {
      const product = this.products[index];
      this.products.splice(index, 1);
      // Guardar los cambios en el archivo
      this.saveToFile();
      return product;
    }
    return null;
  }

  saveToFile() {
    // Guardar los productos en el archivo en la ruta indicada
    try {
      const data = JSON.stringify(this.products, null, 2);
      fs.writeFileSync(this.path, data);
    } catch (err) {
      console.log('Error al escribir en el archivo de productos', err);
    }
  }
}

//const ProductManager = require('./ProductManager');

// Crear una instancia de ProductManager con la ruta al archivo de productos
const productManager = new ProductManager('./productos.json');

// Agregar un nuevo producto
const newProduct = {
  title: 'Smartphone',
  description: 'Un smartphone muy poderoso',
  price: 1000,
  thumbnail: 'https://example.com/smartphone.png',
  code: 'SM01',
  stock: 10
};
productManager.addProduct(newProduct);

// Obtener un producto por su ID
const productById = productManager.getProductById(1);
console.log(productById);

// Obtener todos los productos
const allProducts = productManager.getAllProducts();
console.log(allProducts);

// Actualizar un producto existente
const existingProduct = {
  id: 1,
  title: 'Smartphone actualizado',
  description: 'Un smartphone aún más poderoso',
  price: 1200,
  thumbnail: 'https://example.com/smartphone-updated.png',
  code: 'SM01',
  stock: 15
};
productManager.updateProduct(existingProduct);

// Eliminar un producto por su ID
const deletedProduct = productManager.deleteProductById(2);
console.log(deletedProduct);
