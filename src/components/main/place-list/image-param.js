import React from 'react'

import kitchen from '@assets/noun_Microwave_1907125.svg'
import coffee_cookies from '@assets/noun_Espresso Machine_506772.svg'
import cooler from '@assets/noun_water cooler_1371034.svg'
import food_court from '@assets/noun_Food_2406373.svg'
import internet from '@assets/noun_wi-fi_2437533.svg'
import save_item from '@assets/noun_safe_2131916.svg'
import zoning from '@assets/noun_Map_1966109.svg'
import static_seat from '@assets/noun_Chair_2577262.svg'
import conference_hall from '@assets/noun_Online Conference_2557057.svg'
import round_clock from '@assets/noun_time hours_2277714.svg'
import not_weekend from '@assets/noun_week_247256.svg'
import printer from '@assets/noun_Printer_788502.svg'
import projector from '@assets/noun_Projector_589430.svg'
import PC from '@assets/noun_Computer_12565.svg'
import television from '@assets/noun_TV_1898595.svg'
import secretary from '@assets/noun_secretary_1724724.svg'
import specialized_service from '@assets/noun_service_2334518.svg'
import specialized_equipment from '@assets/noun_Machine_1270879.svg'
import leisure from '@assets/noun_gamepad_880353.svg'
import writing from '@assets/noun_Writing_1976889.svg'

import { Spinner } from '@ui'

export const ImageParam = ({ places, name }) => {
  const image = {
    kitchen: {
      title: 'Кухня',
      img: kitchen,
    },
    coffee_cookies: {
      title: 'Кофе и печеньки',
      img: coffee_cookies,
    },
    cooler: {
      title: 'Кулер',
      img: cooler,
    },
    food_court: {
      title: 'Фуд-корт',
      img: food_court,
    },
    internet: {
      title: 'Интернет',
      img: internet,
    },
    save_item: {
      title: 'Хранение личных вещей',
      img: save_item,
    },
    zoning: {
      title: 'Зонирование пространства',
      img: zoning,
    },
    static_seat: {
      title: 'Закрепление места',
      img: static_seat,
    },
    conference_hall: {
      title: 'Конференц зал',
      img: conference_hall,
    },
    round_clock: {
      title: 'Работа 24 часа',
      img: round_clock,
    },
    not_weekend: {
      title: 'Работа без выходных',
      img: not_weekend,
    },
    printer: {
      title: 'Принтер',
      img: printer,
    },
    projector: {
      title: ' Проектор',
      img: projector,
    },
    PC: {
      title: 'ПК',
      img: PC,
    },
    television: {
      title: 'Телевизор',
      img: television,
    },
    secretary: {
      title: 'Секретарь',
      img: secretary,
    },
    specialized_equipment: {
      title: 'Специализированное оборудование',
      img: specialized_equipment,
    },
    specialized_service: {
      title: 'Специализированные услуги',
      img: specialized_service,
    },
    leisure: {
      title: 'Досуг',
      img: leisure,
    },
    writing_supplies: {
      title: 'Письменные принадлежности',
      img: writing,
    },
  }
  let norm = null
  if (places)
    norm = Object.getOwnPropertyNames(places).map(item => {
      if (typeof places[item] == 'boolean' && places[item]) {
        return (
          <span
            key={'img' + item + places.title_place}
            style={
              name
                ? {
                    display: 'flex',
                  }
                : null
            }
          >
            <img
              src={image[item].img}
              alt={image[item].title}
              width="40px"
              height="40px"
              title={image[item].title}
            ></img>
            <span>{name ? ' - ' + image[item].title : null}</span>
          </span>
        )
      }
    })
  return norm ? <div>{norm}</div> : null
}
