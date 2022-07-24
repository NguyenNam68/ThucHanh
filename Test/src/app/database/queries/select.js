const courses = {
    list : `SELECT * FROM COURSES`,

    one : (id) => { 
        return `SELECT * FROM COURSES WHERE COURSES.id = ${id}`
    },

    add : (data) =>{
        return `INSERT INTO COURSES (id, name, description, image, price, gender) VALUES 
                                    (NULL, '${data.name}', '${data.description}', '${data.image}', '${data.price}', '${data.gender}');`
    },

    update : (data) => {
        return `UPDATE COURSES SET 
                name = '${data.name}',
                description = '${data.description}',
                image = '${data.image}',
                price = '${data.price}',
                gender = '${data.gender}'
                WHERE COURSES.id = ${data.id}`
    },

    delete : (id) => {
        return `DELETE FROM COURSES WHERE id = ${id}`
    }
};

module.exports = courses;