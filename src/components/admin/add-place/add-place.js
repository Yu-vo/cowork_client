import React, { useState, useRef } from 'react'

import { AddImage } from './add-image'
import { AddGeodata } from './add-geodata'
import { AddWorkingTime } from './add-workingtime'
import { AddExtraParametrs } from './add-extraparameters'

import { useDispatch } from 'react-redux'
import { get_places } from '../../../actions'
import { AddPrice } from '@components/admin/add-place/add-price'
import { AddExtraParametrsCafe } from '@components/admin/add-place/add-extraparametrs-cafe'

export const AddPlace = () => {
  let data = useRef()
  const dispatch = useDispatch()
  // let fileInput = useRef()
  const [formPlace, setFormPlace] = useState('')
  const [titlePlace, setTitlePlace] = useState('')
  const [addressPlace, setAddressPlace] = useState('')
  const [metroPlace, setMetroPlace] = useState('Автово')
  const [descriptionPlace, setDescriptionPlace] = useState('')
  const [pricePlace, setPricePlace] = useState([])
  const [webPlace, setWebPlace] = useState('')

  const [imagePlace, setImagePlace] = useState(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null)
  const [parametersCafe, setParametrsCafe] = useState([])
  const [event, setEvent] = useState({})

  const parameters = [
    { title: 'Коворкинги' },
    { title: 'Кафе' },
    { title: 'Библиотеки' },
    { title: 'Другой тип заведений' },
  ]
  const metroList = [
    { title: 'Автово' },
    { title: 'Адмиралтейская' },
    { title: 'Академическая' },
    { title: 'Балтийская' },
    { title: 'Беговая' },
    { title: 'Бухаресткая' },
    { title: 'Василеостровская' },
    { title: 'Владимирская' },
    { title: 'Волковская' },
    { title: 'Выборская' },
    { title: 'Горьковская' },
    { title: 'Гостинный двор' },
    { title: 'Гражданский проспект' },
    { title: 'Дачное' },
    { title: 'Девяткино' },
    { title: 'Достоевская' },
    { title: 'Дунайская' },
    { title: 'Елизаровская' },
    { title: 'Звездная' },
    { title: 'Звенигородская' },
    { title: 'Кировский завод' },
    { title: 'Коменданский проспект' },
    { title: 'Крестовский остров' },
    { title: 'Купчино' },
    { title: 'Ладожская' },
    { title: 'Ленинградский проспект' },
    { title: 'Лесная' },
    { title: 'Лиговский проспект' },
    { title: 'Ломоносовская' },
    { title: 'Маяковская' },
    { title: 'Международная' },
    { title: 'Московская' },
    { title: 'Московские ворота' },
    { title: 'Нарвская' },
    { title: 'Невский проспект' },
    { title: 'Новокрестовская' },
    { title: 'Новочеркасская' },
    { title: 'Обводный канал' },
    { title: 'Обухово' },
    { title: 'Озерки' },
    { title: 'Парк победы' },
    { title: 'Парнас' },
    { title: 'Петроградская' },
    { title: 'Пионерская' },
    { title: 'Прощадь Александра Невского' },
    { title: 'Прощадь восстания' },
    { title: 'Площадь Ленина' },
    { title: 'Площадь Мужества' },
    { title: 'Политехническая' },
    { title: 'Приморская' },
    { title: 'Пролетарская' },
    { title: 'Проспект Большивиков' },
    { title: 'Проспект Ветеранов' },
    { title: 'Проспект Просвещения' },
    { title: 'Проспект Славы' },
    { title: 'Пушкинская' },
    { title: 'Рыбацкое' },
    { title: 'Садовая' },
    { title: 'Сенная площадь' },
    { title: 'Спасская' },
    { title: 'Спортивная' },
    { title: 'Старая деревня' },
    { title: 'Технологический институт' },
    { title: 'Удельная' },
    { title: 'Улица Дыбенко' },
    { title: 'Фрунзенския' },
    { title: 'Черная речка' },
    { title: 'Чернышевская' },
    { title: 'Чкаловская' },
    { title: 'Шушары' },
    { title: 'Электросила' },
  ]
  const [extraParameters, setExtraParameters] = useState({
    0: { title: 'Интернет', id: '0', value: false, bd: 'internet' },
    1: {
      title: 'Хранение вещей',
      id: '1',
      value: false,
      bd: 'save_item',
    },
    2: {
      title: 'Круглосуточная работа',
      id: '2',
      value: false,
      bd: 'round_clock',
    },
    3: {
      title: 'Без выходных',
      id: '3',
      value: false,
      bd: 'not_weekend',
    },
    4: {
      title: 'Конференc зал',
      id: '4',
      value: false,
      bd: 'conference_hall',
    },
    5: {
      title: 'Зонирование пространства',
      id: '5',
      value: false,
      bd: 'zoning',
    },
    6: {
      title: 'Закрепление места',
      id: '6',
      value: false,
      bd: 'static_seat',
    },
    7: { title: 'Кухня', id: '7', value: false, bd: 'kitchen' },
    8: {
      title: 'Кофе и печеньки',
      id: '8',
      value: false,
      bd: 'coffee_cookies',
    },
    9: { title: 'Кулер', id: '9', value: false, bd: 'cooler' },
    10: { title: 'Принтер', id: '10', value: false, bd: 'printer' },
    11: { title: 'Проектор', id: '11', value: false, bd: 'projector' },
    12: {
      title: 'Телевизор',
      id: '12',
      value: false,
      bd: 'television',
    },
    13: {
      title: 'Персональные компьютеры',
      id: '13',
      value: false,
      bd: 'PC',
    },
    14: {
      title: 'Специализированная техника',
      id: '14',
      value: false,
      bd: 'specialized_equipment',
    },
    15: { title: 'Секретарь', id: '15', value: false, bd: 'secretary' },
    16: {
      title: 'Специалированные услуги',
      id: '16',
      value: false,
      bd: 'specialized_service',
    },
    17: {
      title: 'Food court',
      id: '17',
      value: false,
      bd: 'food_court',
    },
    18: {
      title: 'Досуг',
      id: '18',
      value: false,
      bd: 'leisure',
    },
    19: {
      title: 'Письменные принадлежности',
      id: '19',
      value: false,
      bd: 'writing_supplies',
    },
  })
  const [tableDay, setTableDay] = useState({
    0: { title: 'Понедельник', id: '0', value: '', bd: 'mon' },
    1: { title: 'Вторник', id: '1', value: '', bd: 'tue' },
    2: { title: 'Среда', id: '2', value: '', bd: 'ven' },
    3: { title: 'Четверг', id: '3', value: '', bd: 'tho' },
    4: { title: 'Пятница', id: '4', value: '', bd: 'fri' },
    5: { title: 'Суббота', id: '5', value: '', bd: 'sat' },
    6: { title: 'Воскресенье', id: '6', value: '', bd: 'sun' },
  })
  const handleClickType = event => {
    setFormPlace(event.target.id)
  }

  const handleChange = event => {
    console.log(event.target.value)
    switch (event.target.id) {
      case 'titlePlace':
        setTitlePlace(event.target.value)
        break
      case 'addressPlace':
        setAddressPlace(event.target.value)
        break
      // case 'metroPlace':
      //   setMetroPlace(event.target.value)
      //   break
      case 'descriptionPlace':
        setDescriptionPlace(event.target.value)
        break
      case 'webPlace':
        setWebPlace(event.target.value)
        break
      // case 'pricePlace':
      //   setPricePlace(event.target.value)
      //   break
    }
  }
  const handleMetro = event => {
    setMetroPlace(event.target.value)
  }
  const handleClickSubmit = () => {
    const extraOptions = {}
    Object.values(extraParameters).forEach(item => {
      extraOptions[item.bd] = item.value
    })
    const working_time = {}
    Object.values(tableDay).forEach(item => {
      working_time[item.bd] = item.value
    })
    titlePlace && formPlace && addressPlace && metroPlace && descriptionPlace
      ? (data.current = [
          {
            options: {
              title_place: titlePlace,
              form_place: formPlace,
              address_place: addressPlace,
              description_place: descriptionPlace,
              photo_link_place: imagePreviewUrl, // картинка
              long: event.long,
              lat: event.lat,
              working_day: working_time,
              metro: metroPlace,
              price: pricePlace,
              web: webPlace,
            },
          },
          { extraOptions },
          { parametersCafe: parametersCafe },
        ]) &&
        fetch('http://localhost:3000/setplaces', {
          method: 'POST',
          body: JSON.stringify(data.current),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }).then(
          fetch('http://localhost:3000/getplaces', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
            .then(res => res.json())
            .then(res => dispatch(get_places(res)))
            .catch(err => console.log(err))
        )
      : alert('Не все поля заполнены')
    titlePlace && formPlace && addressPlace && metroPlace && descriptionPlace
      ? alert('Данные добавлены')
      : null
  }
  const options = parameters.map(item => {
    return (
      <label key={item.title}>
        <input
          onClick={handleClickType}
          type="radio"
          name="type"
          id={item.title}
        ></input>
        {item.title}
      </label>
    )
  })
  const metroOption = metroList.map(item => {
    return (
      <option key={item.title} value={item.title}>
        {item.title}
      </option>
    )
  })
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minWidth: '80%',
        }}
      >
        <p>Выберите тип места</p>
        <label htmlFor="type">{options}</label>

        <p>Введите название места</p>
        <input
          onChange={handleChange}
          id="titlePlace"
          type="text"
          placeholder="Название заведения"
          value={titlePlace}
        ></input>
        <p>Введите веб-сайт места</p>
        <input
          onChange={handleChange}
          id="webPlace"
          type="text"
          placeholder="Веб-сайт места"
          value={webPlace}
        ></input>
        <p>Введите адрес места</p>
        <input
          onChange={handleChange}
          id="addressPlace"
          type="text"
          placeholder="Адрес"
          value={addressPlace}
        ></input>
        <p>Введите ближайшее метро</p>
        <select value={metroPlace} onChange={handleMetro}>
          {metroOption}
        </select>
        <p>Выберите координаты места</p>
        <AddGeodata setEvent={setEvent} />
        <AddImage
          imagePlace={imagePlace}
          setImagePlace={setImagePlace}
          imagePreviewUrl={imagePreviewUrl}
          setImagePreviewUrl={setImagePreviewUrl}
        />
        <p>Введите описание места</p>
        <textarea
          onChange={handleChange}
          id="descriptionPlace"
          placeholder="Описание места"
          value={descriptionPlace}
        ></textarea>
        <p>Введите время работы</p>
        <AddWorkingTime tableDay={tableDay} setTableDay={setTableDay} />
        {formPlace != 'Кафе' && (
          <>
            <p>Введите параметры места</p>
            <AddExtraParametrs
              extraParameters={extraParameters}
              setExtraParameters={setExtraParameters}
            />
            <AddPrice price={pricePlace} setPricePlace={setPricePlace} />
          </>
        )}
        {formPlace == 'Кафе' && (
          <>
            <p>Введите параметры места</p>
            <AddExtraParametrsCafe
              parametersCafe={parametersCafe}
              setParametrsCafe={setParametrsCafe}
            />
          </>
        )}
        <button
          type="button"
          onClick={handleClickSubmit}
          style={{
            padding: '8px 15px',
            borderRadius: '5px',
            fontSize: '1.5em',
            marginBottom: '10px',
          }}
        >
          Добавить
        </button>
      </div>
    </div>
  )
}
