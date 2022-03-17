import classes from "./PosterCard.module.css";

const PosterCard = ({ media }) => {
  return (
    <div>
      <img src={media.poster} alt={media.title} />
    </div>
  );
};

export default PosterCard;
