// ES module + flat config 방식으로 변경
import tripleConfig from './tripleConfig.js'
import tripleTypeChecking from './tripleTypeChecking.js'

export default [...tripleConfig, ...tripleTypeChecking]
