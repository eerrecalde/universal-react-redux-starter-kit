import React from 'react'
import { bindActionCreators } from 'redux'
import Counter from './Counter'
import { shallow } from 'enzyme'
import expect from 'expect'
import sinon from 'sinon'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import chaiAsPromised from 'chai-as-promised'
import chaiEnzyme from 'chai-enzyme'

chai.use(sinonChai)
chai.use(chaiAsPromised)
chai.use(chaiEnzyme())

global.chai = chai
global.sinon = sinon
global.should = chai.should()

describe('Counter Component', () => {
  let _props, _spies, _wrapper

  beforeEach(() => {
    _spies = {}
    _props = {
      counter: 0,
      ...bindActionCreators({
        onDoubleAsync: (_spies.onDoubleAsync = sinon.spy()),
        onIncrement: (_spies.onIncrement = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }
    _wrapper = shallow(<Counter {..._props} />)
  })

  it('Should have a h2 element title in it', () => {
    expect(_wrapper.find('h2').length).toBe(1)
  })

  it('Should render props.counter at the end of the sample counter <h2>.', () => {
    expect(_wrapper.find('h2').text()).toMatch(/0$/)
    _wrapper.setProps({ counter: 1 })
    expect(_wrapper.find('h2').text()).toMatch(/1$/)
  })

  describe('An increment button...', () => {
    let _button

    beforeEach(() => {
      _button = _wrapper.find('button').filterWhere(a => a.text() === 'Increment')
    })

    it('Should dispatch a `increment` action when clicked', () => {
      _spies.dispatch.should.have.not.been.called
      _button.simulate('click')
      _spies.dispatch.should.have.been.called
      _spies.onIncrement.should.have.been.called
    });
  })

  describe('A Double (Async) button...', () => {
    let _button

    beforeEach(() => {
      _button = _wrapper.find('button').filterWhere(a => a.text() === 'Double (Async)')
    })

    it('Should dispatch a `doubleAsync` action when clicked', () => {
      _spies.dispatch.should.have.not.been.called
      _button.simulate('click')
      _spies.dispatch.should.have.been.called
      _spies.onDoubleAsync.should.have.been.called
    });
  })
})
