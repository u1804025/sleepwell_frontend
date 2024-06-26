import React from 'react'
import HeaderOne from '../common/header/HeaderOne'
import FooterTwo from '../common/footer/FooterTwo'
import Breadcrumb from '../common/breadcrumb/Breadcrumb'
import SleepingTestComponent from '../components/sleepingTest/SleepingTestComponent'

const SleepingTest = () => {
  return (
    <div>
      <HeaderOne />
      <Breadcrumb heading="Question" currentPage="question" />
      <SleepingTestComponent />
      <FooterTwo />

    </div>
  )
}

export default SleepingTest