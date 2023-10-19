import styles from './ActionsBar.module.scss';

enum ButtonType {
    Like = 'likes',
    Favorite = 'favorite',
    Dislike = 'dislikes',
}

interface ActionsBarProps {
    onClick: (buttonType: ButtonType) => void;
  }
  

const ActionsBar:React.FC<ActionsBarProps> = (props) => {

  const handleClick = (buttonType: ButtonType) => {
    props.onClick(buttonType);
  };


    return <div className={styles['actions-wrapper']}>
        <button className={styles.like} onClick={() => handleClick(ButtonType.Like)}></button>
        <button className={styles.favorite} onClick={() => handleClick(ButtonType.Favorite)}></button>
        <button className={styles.dislike} onClick={() => handleClick(ButtonType.Dislike)}></button>
    </div>
}

export default ActionsBar;