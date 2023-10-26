import styles from './ActionLog.module.scss';
import Image from 'next/image';
import {getCurrentTime, capitalize} from '../../helpers/helpers';

const VotingLog:React.FC<{id: string; action: 'add' | 'remove'; category: string}> = (props) => {

const actionTime = getCurrentTime();    
const logActionText = ` was ${props.action === 'add' ? 'added to' : 'removed from'} ${capitalize(props.category)}`;
const iconPath = `/icons/${props.category}-20-icon.svg`;


return <div className={styles['log-wrapper']}>
        <span className={styles['log-time']}>{actionTime}</span>
        <span className={styles['log-name']}>Image ID: <span className={styles.bold}>{props.id}</span>{logActionText}</span>
        {props.action === 'add' && <Image className={styles.icon} src={iconPath} alt={`${props.category} icon`} priority width={20} height={20} />}
</div>

}

export default VotingLog;