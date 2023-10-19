import styles from './SelectList.module.scss';
import {useState} from 'react';

interface SelectConfig {
    options: {name: string, value: string}[]; 
    initial?: {name: string, value: string}; 
    bgColor: string; 
    defaultText?: string; 
    name?: string; 
    width: number; 
    onSetValue: (value: string) => void;
}


const SelectList:React.FC<SelectConfig> = (props) => {
  //delete ? for onSetValue
  
  const [isOpen, setIsOpen] = useState(false); 

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  return   <div className={` ${styles['select-wrapper']} ${styles[`width-${props.width}`]}`}>
    {props.name && <span className={styles['select-name']}>{props.name}</span>}
    <select 
      name={props.name} 
      className={`${styles.select} ${styles[`background-${props.bgColor}`]}`} 
      onClick={toggleDropdown} 
      defaultValue={props.initial?.value}
       
      onChange={(event) => props.onSetValue(event.target.value)}
      // onChange={(event) => {console.log(event.target.value); props.onSetValue(event.target.value)}}
    >
        {props.defaultText && <option className={styles['default-text']} value={props.defaultText}>{props.defaultText}</option>}
          {props.options.map((item, index) => (
            <option key={index} value={item.value}>
              {item.name}
            </option>
          ))}
    </select>
  </div>

}

export default SelectList;