import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Graphs from './Graphs';

Enzyme.configure({ adapter: new Adapter() })

describe('Graphs testing', () =>{
  let wrapper;

  beforeEach(()=>{
    wrapper = shallow(<Graphs/>)
    // console.log(wrapper.debug())
  });

  test('renders graphs title', () => {
    expect(wrapper.find("h1").text()).toContain("Statistics");
  });

  test('renders graphs containers', () => {
    expect(wrapper.contains(<div className="graph__container"/>)).toBe(false)
  });
})