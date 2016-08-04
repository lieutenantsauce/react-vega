import {PropTypes} from 'react';
import Vega from './Vega.js';

export default function createClassFromSpec(name, spec) {
  spec = Vega.readSpec(spec);

  const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    padding: PropTypes.object,
    viewport: PropTypes.array,
    renderer: PropTypes.string,
    data: PropTypes.object,
  };
  if (spec.signals) {
    spec.signals.forEach(signal => {
      propTypes[Vega.listenerName(signal.name)] = PropTypes.func;
    });
  }

  class Chart extends Vega {
    constructor(props) {
      super(props);
      this.state.spec = spec;
      this.state.isSpecFixed = true;
    }
  }

  Chart.getSpec = function() {
    return spec;
  };

  Chart.propTypes = propTypes;

  return Chart;
};