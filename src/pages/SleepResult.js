import React from 'react'
import HeaderOne from '../common/header/HeaderOne'
import FooterTwo from '../common/footer/FooterTwo'
import Breadcrumb from '../common/breadcrumb/Breadcrumb'
import SleepResultComponent from '../components/sleepingTest/SleepResultComponent'

const SleepResult = () => {
  return (
    <div>
      <HeaderOne />
      <Breadcrumb heading="Result" currentPage="reslut" />
      <SleepResultComponent />
      <FooterTwo />

    </div>
  )
}

export default SleepResult