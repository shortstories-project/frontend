export const isEmpty = (value, error) => {
  if (!value) throw error
}

const checkUnique = (login, check) =>
  new Promise(resolve => resolve(check({ variables: { login } })))

export const username = (value, check) =>
  checkUnique(value, check).then(({ data }) => {
    if (!value) throw 'Введите псевдоним.'
    else if (value.length < 3) throw 'Слишком короткий псевдоним.'
    else if (value.length > 50) throw 'Слишком длинный псевдоним.'
    else if (data.checkUserExist) throw 'Псевдоним занят.'
  })

export const isEmail = (value, check) =>
  checkUnique(value, check).then(({ data }) => {
    if (!value) throw 'Введите имэйл.'
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))
      throw 'Некорректный имэйл.'
    else if (data.checkUserExist) throw 'Имэйл занят.'
  })

export const password = value => {
  if (!value) throw 'Введите пароль.'
  else if (value.length < 6) throw 'Слишком короткий пароль.'
}

export const confirmationPassword = (value, password) => {
  if (!value) throw 'Подтвердите пароль.'
  else if (value !== password) throw 'Пароли не совпадают.'
}

export const login = (value, check) =>
  checkUnique(value, check).then(({ data }) => {
    if (!value) throw 'Введите логин.'
    else if (!data.checkUserExist) throw 'Аккаунт не найден.'
  })
