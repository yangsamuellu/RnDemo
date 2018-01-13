import { createNavigationContainer, createNavigator, StackRouter } from 'react-navigation'
import CrossFadeTransitioner from './CrossFade'
import React from 'react'
import { Button } from 'native-base'
import { Template } from './Screens'

const router = StackRouter({
    'A': {
      screen: Template
    },
    'B': {
      screen: Template
    }
  },
  {
    headerMode: 'none',
    initialRouteName: 'A',
    initialRouteParams: {onA: true}
  })

export default createNavigationContainer(createNavigator(router)(CrossFadeTransitioner))
