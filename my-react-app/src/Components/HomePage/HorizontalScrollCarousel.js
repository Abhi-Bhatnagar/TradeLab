import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} style={{position:'relative', height:'300vh', backgroundColor: '#2C3E50'}}>
      <div style={{position: 'sticky', top: 0, display: 'flex', height: '100vh', alignItems: 'center', overflow: 'hidden' }}>
        <motion.div style={{ x, display: 'flex', gap: '1rem' }}>
          {cards.map((card) => (
            <Card card={card} key={card.id} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};


const Card = ({ card }) => (
  <div
    key={card.id}
    style={{ position: 'relative', height: '450px', width: '450px', overflow: 'hidden', backgroundColor: '#ECF0F1' }}
  >
    <div
      style={{
        backgroundImage: `url(${card.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        transition: 'transform 0.3s',
        transform: 'scale(1)',
        zIndex: 0
      }}
    ></div>
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1, display: 'grid', placeContent: 'center' }}>
      <p style={{ background: 'linear-gradient(to bottom right, rgba(255,255,255,0.2), rgba(255,255,255,0))', padding: '2rem', fontSize: '3rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#fff', backdropFilter: 'blur(8px)' }}>
        {card.title}
      </p>
    </div>
  </div>
);

const cards = [
  {
    url: "/imgs/abstract/1.jpg",
    title: "Title 1",
    id: 1,
  },
  {
    url: "/imgs/abstract/2.jpg",
    title: "Title 2",
    id: 2,
  },
  {
    url: "/imgs/abstract/3.jpg",
    title: "Title 3",
    id: 3,
  },
  {
    url: "/imgs/abstract/4.jpg",
    title: "Title 4",
    id: 4,
  },
  {
    url: "/imgs/abstract/5.jpg",
    title: "Title 5",
    id: 5,
  },
];

export default HorizontalScrollCarousel;