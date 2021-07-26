import React from "react";
import {Panel, Div, Button} from "@vkontakte/vkui";

const Order = ({id, go}) => {
    const handleClick = () => {
        console.log('Click')
    }
    return (
      <Panel id={id}>
          <Button size="s" level="2"  onClick={() => {console.log('Click')}}>Back</Button>
      </Panel>
    )
}

export default Order
