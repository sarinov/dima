nameSurname = $('.name_surname')
role = $('#role')
phone = $('#phone')
mail = $('#mail')
age = $('#age')


let user_data = JSON.parse(localStorage.getItem("user_data"))


nameSurname.html(`${user_data.name} ${user_data.surname}`)
role.html(`Role: ${user_data.role}`)
mail.html(`Почта: ${user_data.email}`)
phone.html(`Номер: ${user_data.phone}`)
age.html(`Возраст: ${user_data.age}`)
