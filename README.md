query getAll { getProds { id title price category thumbnail } }

query getById { getProd(id: "2ae10a693dde802999fe") { id title price category thumbnail } }

query getFiltered { getProds(field: "title", value: "a") { id title price category thumbnail } }

mutation create { createProd(data: {title: "b", price: 2, category: "inorganic", thumbnail: "https://picsum.photos/200/300"}) { id title price category thumbnail } }

mutation updateOne { updateProd(id: "2ae10a693dde802999fe", data: {title: "c", price: 3, category: "inorganic", thumbnail: "https://picsum.photos/200/300"}) { id title price category thumbnail } }

mutation deleteOne { deleteProd(id: "2ae10a693dde802999fe") { id } }