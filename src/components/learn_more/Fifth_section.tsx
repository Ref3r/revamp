import React from 'react'
import Image from 'next/image'

interface TestimonialCardProps {
  photo: string;
  name: string;
  content: string;
}
const LAYOUT_STYLES = {
  container: "max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-12",
  section: "bg-[#0E0E0E]"
};

const TestimonialCard = ({ photo, name, content }: TestimonialCardProps) => {
  return (
    <div className='bg-[#1A1919] rounded-[20px] p-6 w-full h-full'>
      <p className='text-white text-[17px] font-normal'>{content}</p>
      <hr className='text-white opacity-10 my-6'/>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-3'>
          <Image src={photo} width={30} height={30} alt={name} className="rounded-full"/>
          <h2 className='text-white font-bold text-lg'>{name}</h2>
        </div>
        <Image src="/twitter_logo.svg" width={20} height={20} alt='Twitter logo'/>
      </div>
    </div>
  )
}

const Fifth_section = () => {
  const testimonials = [
    { photo: "/photo1.svg", name: "Edwel M.", content: "This platform is very easy to use, which makes managing your posts simple. It has helpful tools that let you schedule and organize your content without any hassle. Plus, it allows you to connect and build relationships with your audience, encouraging more interaction. With insights into how your audience behaves and what they like, you can adjust your content to better meet their needs and grow your community. Overall, this platform helps you strengthen your online presence and make your interactions more personal." },
    { photo: "/photo2.svg", name: "Abegail F.", content: "Omg! This is my absolutely favorite app this 2024 when it comes to social managing- saves me hours every week hassle free." },
    { photo: "/photo3.svg", name: "Verified User in Photography", content: "I like how the software works because it's easy to navigate, especially if you know what you're looking for and what you need. I like how there are many features available as well to make sure you are able to maximize everything for your social media platforms. For newbies to the software and clients, this is going to be very useful for managing your social media and get all the data you need with it's features like the scheduling and analytics features." },
    { photo: "/photo4.svg", name: "Iornienge S.", content: "There are several things I love about this suite. Some of these things include - Ease of use - Helps me organize my social media accounts - I get work done faster - It does not consume my time - it has a professional interface" },
    { photo: "/photo5.svg", name: "jacob s.", content: "It is fantastic! It makes social media management so easy. The AI tools for content creation and scheduling are a huge time-saver. I love the built-in design features and how simple it is to manage everything in one place. Highly recommend for anyone looking to streamline their social media tasks!" },
    { photo: "/photo6.svg", name: "Maria Camila A.", content: "It changed how we manage our social media presence by aggregating our platforms into one effective tool. Post scheduling, and AI post ideation are two of the many features that come with It, and have made our management of social media simple and effective! Highly recommended." },
    { photo: "/photo7.svg", name: "Muhammad N.", content: "This is a user-friendly interface and reasonable price plans are available especially for small business and individual users" },
    { photo: "/photo8.svg", name: "Aadarsh K.", content: "nice and simple to UI and awsome interface" },
    { photo: "/photo9.svg", name: "Johannes D.", content: "As a privacy-first company we appreciate being able to self-host it! It brings all the core functionality of a social media scheduler plus a lot of AI to make things faster. It's also very easy to deploy and use, great work!" },
    { photo: "/photo10.svg", name: "Rimsha S.", content: "as a user of Postiz as a digital marketer, I liked it much because with Postiz I managed things best and made my work easier." },
    { photo: "/photo11.svg", name: "Ali A.", content: "It helps us to manage all our social media posts from one Platform. It automates our daily tasks, and It can significantly save time and effort." },
    { photo: "/photo12.svg", name: "Favour E.", content: "It helped us manage all our social medias in one peace, ranging from shechduling posts to generatig amazing post with AI. I recommend." },
    { photo: "/photo13.svg", name: "Vince C.", content: "I work in Developer Relations, so having a tool that helps me manage and crosspost to different platforms saves me so, so, so much time!" }
  ]


  return (
    <div className={LAYOUT_STYLES.section}>
      <div className={LAYOUT_STYLES.container + " py-16 md:py-24"}>
      {/* Header */}
      <div className='flex justify-center items-center gap-3 mb-12'>
        <h1 className='text-white text-3xl sm:text-4xl lg:text-5xl font-bold'>Wall of love</h1>
        <Image 
          src="/heart.svg" 
          width={57} 
          height={51} 
          alt="Heart icon"
          className='w-10 sm:w-12 lg:w-14'
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1440px] mx-auto'>
        {/* First Column */}
        <div className='flex flex-col gap-6'>
          <TestimonialCard photo="/photo1.svg" name="Edwel M." content="This platform is very easy to use, which makes managing your posts simple. It has helpful tools that let you schedule and organize your content without any hassle. Plus, it allows you to connect and build relationships with your audience, encouraging more interaction. With insights into how your audience behaves and what they like, you can adjust your content to better meet their needs and grow your community. Overall, this platform helps you strengthen your online presence and make your interactions more personal." />
          <TestimonialCard photo="/photo2.svg" name="Abegail F." content="Omg! This is my absolutely favorite app this 2024 when it comes to social managing- saves me hours every week hassle free." />
          <TestimonialCard photo="/photo3.svg" name="Verified User in Photography" content="I like how the software works because it's easy to navigate, especially if you know what you're looking for and what you need..." />
          <TestimonialCard photo="/photo11.svg" name="Ali A." content="It helps us to manage all our social media posts from one Platform. It automates our daily tasks, and It can significantly save time and effort." />
        </div>

        {/* Second Column */}
        <div className='flex flex-col gap-6'>
          <TestimonialCard photo="/photo4.svg" name="Iornienge S." content="There are several things I love about this suite. Some of these things include - Ease of use - Helps me organize my social media accounts - I get work done faster - It does not consume my time - it has a professional interface" />
          <TestimonialCard photo="/photo5.svg" name="jacob s." content="It is fantastic! It makes social media management so easy. The AI tools for content creation and scheduling are a huge time-saver..." />
          <TestimonialCard photo="/photo6.svg" name="Maria Camila A." content="It changed how we manage our social media presence by aggregating our platforms into one effective tool..." />
          <TestimonialCard photo="/photo7.svg" name="Muhammad N." content="This is a user-friendly interface and reasonable price plans are available especially for small business and individual users" />
          <TestimonialCard photo="/photo8.svg" name="Aadarsh K." content="nice and simple to UI and awsome interface" />
        </div>

        {/* Third Column */}
        <div className='flex flex-col gap-6'>
          <TestimonialCard photo="/photo9.svg" name="Johannes D." content="As a privacy-first company we appreciate being able to self-host it! It brings all the core functionality of a social media scheduler plus a lot of AI to make things faster..." />
          <TestimonialCard photo="/photo10.svg" name="Rimsha S." content="as a user of Postiz as a digital marketer, I liked it much because with Postiz I managed things best and made my work easier." />
          <TestimonialCard photo="/photo12.svg" name="Favour E." content="It helped us manage all our social medias in one peace, ranging from shechduling posts to generatig amazing post with AI. I recommend." />
          <TestimonialCard photo="/photo13.svg" name="Vince C." content="I work in Developer Relations, so having a tool that helps me manage and crosspost to different platforms saves me so, so, so much time!" />
        </div>
      </div>
    </div>
    </div>
    
  )
}

export default Fifth_section