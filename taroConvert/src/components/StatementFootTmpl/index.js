import {
  Block,
  View
} from '@tarojs/components'
import styles from './index.module.scss'
export default function (props) {
  return (
    <Block>
      <View className={styles['page-foot']}>{props.statement}</View>
    </Block>
  )
}
