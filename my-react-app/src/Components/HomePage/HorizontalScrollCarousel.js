import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} style={{position:'relative', height:'300vh', backgroundColor: '#131D28'}}>
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
  <a href={card.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
    <div
      key={card.id}
      style={{ position: 'relative', height: '500px', width: '500px', overflow: 'hidden', backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '20px', opacity: '0.5' }}
    >
      <div
        style={{
          backgroundImage: `url(${card.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          transition: 'transform 0.3s',
          borderRadius: '20px', // Rounded edges
          zIndex: 0
        }}
      ></div>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1, display: 'grid', placeContent: 'center' }}>
      <p style={{ background: 'transparent', padding: '2rem', fontSize: '3rem', color: '#fff' }}>
          {card.quote}
      </p>
        <p style={{ background: 'transparent', padding: '2rem', fontSize: '3rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#fff' }}>
          {card.title}
        </p>
      </div>
    </div>
  </a>
);

const cards = [
  {
    quote: "Why Financial Literacy Isn’t Gen Z’s Sweet Spot—Yet",
    title: "-Forbes",
    url: "https://www.forbes.com/sites/markcperna/2022/09/13/why-financial-literacy-isnt-gen-zs-sweet-spot-yet/?sh=79b81614627c",
    id: 1,
  },
  {
    quote: "Want to Teach Teens to Invest? There’s an App for That.",
    title: "-Barron's",
    url: "https://www.barrons.com/advisor/articles/teen-investing-apps-51673013619",
    id: 2,
  },
  {
    quote: "This Fintech Is Getting Teens Into Investing",
    title: "-Benzinga",
    url: "https://www.benzinga.com/fintech/22/01/25297335/this-fintech-is-getting-teens-into-investing-but-parents-can-still-keep-a-close-eye",
    id: 3,
  },
  {
    quote: "Investment accounts for minors have surged in popularity",
    title: "-WSJ",
    url: "https://www.wsj.com/personal-finance/url-teens-stock-trading-apps-e839f82a",
    id: 4,
  },
  {
    quote: "Investing for Teens: Most Teens Want to Invest (but Aren’t)",
    title: "-NASDAQ",
    url: "https://www.nasdaq.com/articles/investing-for-teens-most-teens-want-to-invest-but-arent",
    id: 5,
  },
];

export default HorizontalScrollCarousel;
