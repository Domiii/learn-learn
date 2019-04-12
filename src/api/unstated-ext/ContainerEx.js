export { Container } from 'unstated';

export default class ContainerEx extends Container {
  constructor() {
    super();

    if (this.actions) {
      this.state = Object.assign({}, this.state, this.actions);
    }
  }
}