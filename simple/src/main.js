import $ from 'jquery'

import './css/main.scss'

$('body').addClass('gray')

import(/* webpackChunkName: "modA" */ './modA').then(modA => {
    console.log(modA.add(3, 4))
})
