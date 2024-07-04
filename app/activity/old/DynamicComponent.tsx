import React from 'react'
import Like from './liked'
import MATCHED from './match'
import Interested from './interested'

interface DynamicComponentProps {
  selectedComponent: string
}

const DynamicComponent: React.FC<DynamicComponentProps> = ({
  selectedComponent
}) => {
  switch (selectedComponent) {
    case 'LIKE':
      return <Like />
    case 'MATCH':
      return <MATCHED />
    case 'INTERESTED':
      return <Interested />
    default:
      return null
  }
}

export default DynamicComponent
