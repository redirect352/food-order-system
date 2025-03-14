'use client'

import moment from "moment";

export function DateTitle(){
  return (
    `Меню на ${moment().format('DD.MM.yyyy')}`
  );
}