import Picture from './Picture'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function TitleImage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      gsap
        .timeline({
          scrollTrigger: { trigger: '.title_picture', start: 'top top', end: 'bottom top', scrub: true }
        })
        .to('.title_picture', { y: 100 })
    },
    { scope: sectionRef }
  )

  return (
    <div ref={sectionRef}>
      <Picture
        src='https://images.theconversation.com/files/611350/original/file-20240805-21-8bzb4w.jpg'
        loading='eager'
        className='full_screen_media not-prose absolute left-0 top-0 z-0 !h-[50vh] overflow-hidden opacity-50'
        imgClassName='not_fullscreen_media w-screen h-[50vh] object-cover object-top title_picture'
        caption=''
        source='Photo: Roun Ry'
        sourceLink=''
        alt='Drone shot of balconies taken from the courtyard of the Jinshui compound in Otres Village, Sihanoukville.'
        focalPoint={{
          mobile: { x: 0.5, y: 0.5 },
          tablet: { x: 0.5, y: 0.5 },
          tabletLandscape: { x: 0.5, y: 0.5 },
          laptop: { x: 0.5, y: 0.5 },
          desktop: { x: 0.5, y: 0.5 }
        }}
      />
    </div>
  )
}
