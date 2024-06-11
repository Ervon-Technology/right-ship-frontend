const TEAM = () => {
  return (
    <div
      className="w-[1105px] max-w-full flex flex-col items-start justify-start gap-[32px] leading-[normal] tracking-[normal] text-left text-[20px] text-black font-inter mq725:gap-[16px]"
    >
      <b className="relative font-bold inline-block min-w-[54px] mq450:text-base">
        Team
      </b>
      <section className="self-stretch rounded bg-white box-border flex flex-col items-start justify-start pt-[19px] px-[22px] pb-6 gap-[15px] max-w-full text-left text-base text-black font-inter border-[1px] border-solid border-blue-300 mq450:pt-5 mq450:pb-5 mq450:box-border">
        <div className="w-[1105px] h-[459px] relative rounded bg-white box-border hidden max-w-full border-[1px] border-solid border-blue-300" />
        <div className="self-stretch flex flex-row items-start justify-between max-w-full gap-[20px] mq1000:flex-wrap">
          <div className="w-[436px] flex flex-row items-start justify-start gap-[15px] max-w-full mq450:flex-wrap">
            <button className="cursor-pointer pt-[9px] px-5 pb-2 bg-white w-[113px] box-border flex flex-row items-start justify-start whitespace-nowrap z-[1] border-[1px] border-solid border-blue-300 hover:bg-gainsboro hover:box-border hover:border-[1px] hover:border-solid hover:border-gray-100">
              <div className="h-10 w-[113px] relative bg-white box-border hidden border-[1px] border-solid border-blue-300" />
              <u className="[text-decoration:none] relative text-base font-medium font-inter text-black text-left inline-block min-w-[66px] z-[2]">
                Show All
              </u>
            </button>
            <div className="flex-1 bg-white box-border flex flex-row items-start justify-start pt-2.5 pb-[7px] pr-[61px] pl-[62px] min-w-[183px] whitespace-nowrap z-[1] border-[1px] border-solid border-blue-300 mq450:pl-5 mq450:pr-5 mq450:box-border">
              <div className="h-10 w-[308px] relative bg-white box-border hidden border-[1px] border-solid border-blue-300" />
              <u className="[text-decoration:none] relative font-medium text-[inherit] z-[2]">{`Search by name & Email`}</u>
            </div>
          </div>
          <div className="w-[326px] flex flex-row items-start justify-start gap-[12px] max-w-full">
            <input  
              className="[outline:none] bg-white h-10 flex-1 relative box-border min-w-[94px] z-[1] border-[1px] border-solid border-blue-300"
              type="text"
            />
            <div className="flex flex-col items-start justify-start pt-px px-0 pb-0">
              <div className="bg-white flex flex-row items-start justify-start pt-[9px] pb-2 pr-[41px] pl-[42px] whitespace-nowrap z-[1] border-[1px] border-solid border-blue-300">
                <div className="h-10 w-[157px] relative bg-white box-border hidden border-[1px] border-solid border-blue-300" />
                <u className="[text-decoration:none] relative font-medium text-[inherit] inline-block min-w-[72px] z-[2]">
                  Add User
                </u>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch bg-white box-border flex flex-col items-start justify-start pt-0 px-0 pb-[156px] gap-[0.3px] min-h-[356px] max-w-full z-[1] text-left text-base text-black font-inter border-[1px] border-solid border-blue-300 mq450:pb-[101px] mq450:box-border">
          <div className="self-stretch h-[356px] relative bg-white box-border hidden border-[1px] border-solid border-blu0" />
          <div className="self-stretch bg-white box-border flex flex-row items-start justify-start py-[9px] px-5 gap-[121px] top-[0] z-[99] sticky max-w-full border-[1px] border-solid border-blue-300 mq450:gap-[30px] mq1000:gap-[60px]">
            <div className="h-[41px] w-[1058px] relative bg-white box-border hidden max-w-full border-[1px] border-solid border-blue-300" />
            <div className="flex flex-row items-start justify-start py-0 pr-9 pl-0 gap-[18px]">
              <input className="m-0 h-[19px] w-[18px]" type="checkbox" />
              <u className="[text-decoration:none] relative font-medium text-[inherit] inline-block min-w-[45px] z-[3]">
                Name
              </u>
            </div>
            <div className="w-[107px] flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border">
              <u className="[text-decoration:none] relative font-medium text-[inherit] inline-block min-w-[41px] z-[3]">
                Email
              </u>
            </div>
            <div className="w-[87px] flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border">
              <u className="[text-decoration:none] relative font-medium text-[inherit] inline-block min-w-[62px] z-[3]">
                Contact
              </u>
            </div>
            <u className="[text-decoration:none] relative font-medium text-[inherit] inline-block min-w-[50px] z-[3]">
              Status
            </u>
            <u className="[text-decoration:none] relative font-medium text-[inherit] inline-block min-w-[34px] z-[3]">
              Role
            </u>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start py-0 px-px box-border max-w-full">
            <div className="flex-1 bg-white box-border flex flex-row items-start justify-between pt-2 pb-[5px] pr-[59px] pl-[19px] max-w-full gap-[20px] z-[2] border-b-[1px] border-solid border-blue-300 mq1000:flex-wrap mq1050:pr-[29px] mq1050:box-border">
              <div className="h-[39px] w-[1056px] relative bg-white box-border hidden max-w-full border-b-[1px] border-solid border-blue-300" />
              <div className="flex flex-col items-start justify-start pt-[3px] pb-0 pr-7 pl-0">
                <div className="flex flex-row items-start justify-start gap-[15px]">
                  <input
                    className="m-0 h-[18px] w-[18px] relative box-border z-[3] border-[0px] border-solid border-gray-200"
                    type="checkbox"
                  />
                  <div className="relative font-medium inline-block min-w-[72px] z-[3]">
                    User One
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start pt-0.5 px-0 pb-0">
                <u className="relative [text-decoration:underline] font-medium inline-block min-w-[126px] whitespace-nowrap z-[3]">
                  gmail@mail.com
                </u>
              </div>
              <div className="w-[271px] flex flex-col items-start justify-start pt-px pb-0 pr-3.5 pl-0 box-border">
                <div className="self-stretch flex flex-row items-start justify-between gap-[20px]">
                  <div className="flex flex-col items-start justify-start pt-px px-0 pb-0">
                    <div className="relative font-medium inline-block min-w-[124px] z-[3]">
                      91 8693895363
                    </div>
                  </div>
                  <u className="[text-decoration:none] relative font-medium text-[inherit] inline-block min-w-[49px] z-[3]">
                    Active
                  </u>
                </div>
              </div>
              <div className="w-[133px] flex flex-row items-start justify-start gap-[35px]">
                <div className="relative font-medium inline-block min-w-[74px] z-[3]">
                  Admin
                </div>
                <img
                  className="h-6 w-6 relative overflow-hidden shrink-0 z-[3]"
                  loading="lazy"
                  alt=""
                  src="https://img.icons8.com/?size=100&id=84119&format=png&color=000000"
                />
              </div>
            </div>
          </div>
        </div>
        </section>
      </div>
  );
};

export default TEAM;

