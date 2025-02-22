

const Banner = ({ data }:any) => {
    return(
        <>
        <div className="bg-gray-100 py-14">
            <div className="container mx-auto px-10">
                  <h5 className="text-left">{data?.categoryName}</h5>
                  <h1 className="text-left txt_light_green text-4xl lg:text-6xl py-2">{data?.companyName}</h1>
            </div>
        </div>
        </>
    )
}

export default Banner;