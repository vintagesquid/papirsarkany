import { FC } from "react";

const GoogleMapIframe: FC = () => {
  return (<iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1131.6105816797208!2d18.87852618960264!3d47.57870829362802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xceefc53f4870d42e!2swww.papirsarkany.hu!5e0!3m2!1shu!2shu!4v1579197549648!5m2!1shu!2shu"
    className="mx-auto h-[600px] w-full max-w-6xl rounded-xl border-3"
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="Google map"
  />)
}

export default GoogleMapIframe;
