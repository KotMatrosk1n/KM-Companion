// By default, importing `@km-companion/engine` provides a convenience wrapper roughly equivalent
// to importing `@km-companion/engine/adaptable` and
// `import Generations from '@km-companion/engine/data'`, then
// using  `Generations` to populate the `Generation` param to these exports. Alternatively, an
// application may implement a different `@km-companion/engine/data/interface` and pass a
// `Generation` from
// that to these exports.

export {calculate} from './calc';
export {Pokemon} from './pokemon';
export {Move} from './move';
export {Field, Side} from './field';
export {Result} from './result';
export {Stats} from './stats';
