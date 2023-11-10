import styles from './ActionLog.module.scss';
import Image from 'next/image';
import {capitalize} from '../../helpers/helpers';

interface VotingLogItem {
        id: string;
        action: 'add' | 'remove';
        category: string;
        time: string
    }

const VotingLog:React.FC<VotingLogItem> = ({id, action, category, time}) => {
   
const logActionText = ` was ${action === 'add' ? 'added to' : 'removed from'} ${capitalize(category)}`;
const iconPath = `/icons/${category}-20-icon.svg`;


return <div className={styles['log-wrapper']}>
        <span className={styles['log-time']}>{time}</span>
        <span className={styles['log-name']}>Image ID: <span className={styles.bold}>{id}</span>{logActionText}</span>
        {action === 'add' && <Image 
                className={styles.icon} 
                src={iconPath} 
                alt={`${category} icon`} 
                priority 
                width={20} 
                height={20} 
        />}
</div>

}

export default VotingLog;