import Mock from 'mockjs'
import Data from './data.json'
Mock.mock('/api/goods', { code: 0, data: Data.goods })
Mock.mock('/api/ratings', { code: 0, data: Data.ratings })
Mock.mock('/api/info', { code: 0, data: Data.info })