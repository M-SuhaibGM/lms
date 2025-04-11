"use client"
import { Button } from '../../../../components/ui/button'
import { formetPrice } from '../../../../lib/formet'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const CourseInroleButton = ({ courseId, price }) => {
  const [loading, setloading] = useState(false)



  const onClick = async () => {
    setloading(true)
    try {
      const responce = await axios.post(`/api/courses/${courseId}/checkout`)
      window.location.assign(responce.data.url)
    } catch (e) {

      toast.error("Something went wrong")
      console.log(e)
    } finally {
      setloading(false)
    }
  }
  return (
    <Button onClick={onClick} disabled={loading} className={"w-full md:w-auto cursor-pointer "} size="sm">
      Enrol for {formetPrice(price)}
    </Button>
  )
}

export default CourseInroleButton