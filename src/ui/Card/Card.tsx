import styles from './Card.module.scss'

function Card(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

export default Card;
