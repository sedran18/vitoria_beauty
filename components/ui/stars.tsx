import StarIcon from '@mui/icons-material/Star';

interface StarsProps {
  rating: number;       
  cor?: string;        
  max?: number;          
  size?: number;  
  cor2?:string       
}

const Stars = ({ rating, cor = "gold", max = 5, size = 24, cor2 = 'grey'}: StarsProps) => {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => {

        const isActive = i < Math.floor(rating);
        return (
            <StarIcon
                key={i}
                style={{
                    color: isActive ? cor : cor2,
                    fontSize: size
                }}
            />
    )
      })}
    </div>
  );
};

export default Stars;
