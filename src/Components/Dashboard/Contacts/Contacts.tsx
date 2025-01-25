

const Contacts = () => {
    return (
        <>
            <div>
                <h3 className="pb-4 lg:pb-8" >Contacts</h3>
                <hr className="" />
            </div>
            <div className="py-10 px-6 md:flex md:w-full">
                <div className="bg_black text-white md:w-1/2 pt-2 pb-3 md:py-6 lg:px-4 xl:px-6 text-center">
                    <p className="font-medium">Nous contacter</p>
                    <p className="">Du lundi au vendredi</p>
                    <p className="">De 9h à 18h</p>
                </div>
                <div className="bg_green py-4 text-center flex justify-center items-center content-center md:w-1/2 md:py-6 lg:px-4">
                    <div className="text-center">
                        {/* <p className="fs_20 text-center">06 03 84 08 12</p> */}
                    </div>
                    <div className="flex justify-center items-center content-center text-center">
                        <p>contact@lindicateur.fr</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contacts;