/* const articulosJSON =`[{"produtID": 0,
                        "categoria": ["zapatos","camisas","bolsos","pantalones"],
                        "productName": "playera negra con rayas blancas",
                        "imagen": "img/zapatillaNegra.jpg",
                        "precio": 50,
                        "descripcion": "playera negra con rayas blancas, de la talla 41, con puntera reforzada",
                        "talla": "41",
                        "stock": "true"
                        },

                        
const articulosJSON =[{"produtID": 0,
                        "categoria": "bolsos",
                        "productName": "Bolso Azul",
                        "imagen": "img/bolsos/bolso-azul.jpg",
                        "precio": 35,
                        "descripcion": "Bolso azul con tres espacios",
                        "talla": "pequeno",
                        "stock": "true"
                        },

                        {"produtID": 1,
                        "categoria": "bolsos",
                        "productName": "Bolso Marron",
                        "imagen": "img/bolsos/bolso-marron.jpg",
                        "precio": 65,
                        "descripcion": "Bolso marron con asa color beige",
                        "talla": "mediano",
                        "stock": "true"
                        },

                        {"produtID": 2,
                        "categoria": "bolsos",
                        "productName": "Bolso Blanco",
                        "imagen": "img/bolsos/bolso-media-luna-suave.jpg",
                        "precio": 25,
                        "descripcion": "Bolso blanco con forma de media luna",
                        "talla": "mediano",
                        "stock": "true"
                        },

                        {"produtID": 3,
                        "categoria": "bolsos",
                        "productName": "Mochila Azul",
                        "imagen": "img/bolsos/mochila-azul.jpg",
                        "precio": 45,
                        "descripcion": "Mochila azul para ir al monte",
                        "talla": "mediano",
                        "stock": "true"
                        },

                        {"produtID": 4,
                        "categoria": "bolsos",
                        "productName": "Mochila Oscura",
                        "imagen": "img/bolsos/mochila-oscura.jpg",
                        "precio": 30,
                        "descripcion": "Bolso gris de tres cremalleras",
                        "talla": "mediano",
                        "stock": "true"
                        },

                        {"produtID": 5,
                        "categoria": "bolsos",
                        "productName": "troley Azul",
                        "imagen": "img/bolsos/troley.jpg",
                        "precio": 70,
                        "descripcion": "Troley de color azul con 4 ruedas",
                        "talla": "mediano",
                        "stock": "true"
                        },


                        

                        {"produtID": 6,
                        "categoria": "camisas",
                        "productName": "Camisa hombre azul",
                        "imagen": "../assets/img/camisas/camisa-hombre-2.jpg",
                        "precio": 25,
                        "descripcion": "Camisa azul con rayas verticales",
                        "talla": "L",
                        "stock": 2
                        },

                        {"produtID": 7,
                        "categoria": "camisas",
                        "productName": "Camisa azul estampada",
                        "imagen": "../assets/img/camisas/camisa-hombre-3.jpg",
                        "precio": 35,
                        "descripcion": "Camisa azul con estampado clasico en la parte superior",
                        "talla": "XL",
                        "stock": 1
                        },

                        {"produtID": 8,
                        "categoria": "camisas",
                        "productName": "Camisa estampada verde",
                        "imagen": "../assets/img/camisas/camisa-hombre-4.jpg",
                        "precio": 45,
                        "descripcion": "Camisa estampada en color verde",
                        "talla": "M",
                        "stock": 5
                        },

                        {"produtID": 9,
                        "categoria": "camisas",
                        "productName": "Camisa negra",
                        "imagen": "../assets/img/camisas/camisa-hombre-5.jpg",
                        "precio": 30,
                        "descripcion": "Camisa negra con dos bolsillos",
                        "talla": "L",
                        "stock": 4
                        },

                        {"produtID": 10,
                        "categoria": "camisas",
                        "productName": "Camisa mujer rayas",
                        "imagen": "../assets/img/camisas/camisa-mujer-3.jpg",
                        "precio": 65,
                        "descripcion": "Camisa mujer con rayas verticales y tonos azulados",
                        "talla": "S",
                        "stock": 3
                        },



                        {"produtID": 11,
                        "categoria": "pantalones",
                        "productName": "Pantalon de deporte",
                        "imagen": "../assets/img/pantalones/pantalon-deporte-oscuro.jpg",
                        "precio": 55,
                        "descripcion": "Pantalon de deporte en color azul marino",
                        "talla": "XL",
                        "stock": 1
                        },

                        {"produtID": 12,
                        "categoria": "pantalones",
                        "productName": "Pantalon granate",
                        "imagen": "../assets/img/pantalones/pantalon-granate.jpg",
                        "precio": 65,
                        "descripcion": "Pantalon de trekking en color granate para hombre",
                        "talla": "XL",
                        "stock": 4
                        },

                        {"produtID": 13,
                        "categoria": "pantalones",
                        "productName": "Pantalon de lino blanco",
                        "imagen": "../assets/img/pantalones/pantalon-lino-blanco.jpg",
                        "precio": 35,
                        "descripcion": "Pantalon de lino blanco para mujer",
                        "talla": "M",
                        "stock": 3
                        },

                        {"produtID": 14,
                        "categoria": "pantalones",
                        "productName": "Pantalon de esqui rosa",
                        "imagen": "../assets/img/pantalones/pantalon-ski-rosa.jpg",
                        "precio": 85,
                        "descripcion": "Pantalon de esquiar para mujer color rosa",
                        "talla": "S",
                        "stock": 2
                        },

                        {"produtID": 15,
                        "categoria": "pantalones",
                        "productName": "Pantalon vaquero azul",
                        "imagen": "../assets/img/pantalones/pantalon-vaquero-azul.jpg",
                        "precio": 55,
                        "descripcion": "Pantalon vaquero de color azul claro con algún roto",
                        "talla": "L",
                        "stock": 1
                        },



                        {"produtID": 16,
                        "categoria": "zapatos",
                        "productName": "Zapatillas blancas",
                        "imagen": "../assets/img/zapatos/zapatilla-blanca.jpg",
                        "precio": 45,
                        "descripcion": "Zapatillas blancas de deporte",
                        "talla": "40",
                        "stock": 5
                        },

                        {"produtID": 17,
                        "categoria": "zapatos",
                        "productName": "Zapatillas grises",
                        "imagen": "../assets/img/zapatos/zapatilla-gris.jpg",
                        "precio": 40,
                        "descripcion": "Zapatillas de color gris sin cordones",
                        "talla": "43",
                        "stock": 4
                        },

                        {"produtID": 18,
                        "categoria": "zapatos",
                        "productName": "Zapatillas rosas",
                        "imagen": "../assets/img/zapatos/zapatilla-rosa.jpg",
                        "precio": 45,
                        "descripcion": "Zapatillas de color rosa para mujer",
                        "talla": "38",
                        "stock": 3
                        },

                        {"produtID": 19,
                        "categoria": "zapatos",
                        "productName": "Zapatillas negras",
                        "imagen": "../assets/img/zapatos/zapatillaNegra.jpg",
                        "precio": 45,
                        "descripcion": "Zapatillas negras con dos rayas blancas",
                        "talla": "41",
                        "stock": 2
                        },

                        {"produtID": 20,
                        "categoria": "zapatos",
                        "productName": "Zapatillas azules sin cordones",
                        "imagen": "../assets/img/zapatos/zapatilla-sin-cordones.jpg",
                        "precio": 35,
                        "descripcion": "Zapatillas de color azul sin cordones",
                        "talla": "44",
                        "stock": 2
                        },

                        {"produtID": 21,
                        "categoria": "zapatos",
                        "productName": "Zapatos negros de vestir",
                        "imagen": "../assets/img/zapatos/zapatilla-blanca.jpg",
                        "precio": 75,
                        "descripcion": "Zapatos negros de vestir ",
                        "talla": "42",
                        "stock": 2
                        },

] 
