import styles from '../ui/SelectList.module.scss';
import {useState} from 'react';


const SelectList:React.FC<{options: string[]; bgColor: string; defaultText?: string; name?: string; width: number; onSetValue?: () => void}> = (props) => {
  //delete ? for onSetValue
  
  const [isOpen, setIsOpen] = useState(false); 

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  return   <div className={` ${styles['select-wrapper']} ${styles[`width-${props.width}`]}`}>
    {props.name && <span className={styles['select-name']}>{props.name}</span>}
    <select name={props.name} className={`${styles.select} ${styles[`background-${props.bgColor}`]}`} onClick={toggleDropdown}>
        {props.defaultText && <option className={styles['default-text']} value={props.defaultText}>{props.defaultText}</option>}
          {props.options.map((option, index) => (
            <option key={index} value={option} onChange={props.onSetValue}>
              {option}
            </option>
          ))}
    </select>
  </div>

}

export default SelectList;