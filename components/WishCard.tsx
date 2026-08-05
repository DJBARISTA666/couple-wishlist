import AnimatedCard from "@/components/AnimatedCard";

export default function WishCard({
  emoji,
  title,
  price,
  url,
  completed,
  priority,
  canComplete = true,
  onComplete,
  canDelete = false,
  onDelete,
}: {
  emoji: string;
  title: string;
  price: string;
  url?: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  canComplete?: boolean;
  onComplete: () => void;
  canDelete?: boolean;
  onDelete?: () => void;
}) {


  const priorityData = {
    high: {
      text: "🔥 Очень хочу",
    },
    medium: {
      text: "❤️ Хочу",
    },
    low: {
      text: "🌙 Когда-нибудь",
    },
  };



  function openLink() {

    if (!url) return;

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );

  }



  return (

    <AnimatedCard delay={0.15}>

      <div
        className="
          overflow-hidden
          rounded-[32px]
          bg-white
          shadow-[0_10px_30px_rgba(0,0,0,0.05)]
          transition
          hover:scale-[1.02]
        "
      >


        <div className="p-6">


          <div className="flex items-center justify-between gap-3">


            <div className="flex items-center gap-3">


              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#F7F3EE]
                  text-2xl
                "
              >
                {emoji}
              </div>



              <div>

                <h2 className="text-xl font-semibold">
                  {title}
                </h2>


                <p className="text-sm text-neutral-500">
                  {price}
                </p>


              </div>


            </div>



            {canDelete && onDelete && (

              <button
                onClick={onDelete}
                className="
                  rounded-xl
                  bg-red-50
                  px-3
                  py-2
                  text-sm
                  text-red-500
                  transition
                  active:scale-95
                "
              >
                🗑️
              </button>

            )}


          </div>





          <div
            className="
              mt-5
              inline-flex
              rounded-full
              bg-[#F7F3EE]
              px-4
              py-2
              text-sm
              font-medium
            "
          >
            {priorityData[priority].text}
          </div>






          {url && (

            <button
              onClick={openLink}
              className="
                mt-5
                w-full
                rounded-2xl
                bg-[#F7F3EE]
                p-4
                text-sm
                font-semibold
                text-neutral-700
                transition
                active:scale-95
              "
            >
              🔗 Открыть ссылку
            </button>

          )}






          <div className="mt-5">


            {completed ? (


              <div
                className="
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  bg-[#F7F3EE]
                  p-4
                  font-semibold
                "
              >

                <span>
                  ❤️ Желание исполнено
                </span>


                {canDelete && onDelete && (

                  <button
                    onClick={onDelete}
                    className="
                      rounded-xl
                      bg-white
                      px-3
                      py-2
                      text-red-500
                      transition
                      active:scale-95
                    "
                  >
                    🗑️
                  </button>

                )}

              </div>


            ) : canComplete ? (


              <button
                onClick={onComplete}
                className="
                  w-full
                  rounded-2xl
                  bg-[#1C1C1E]
                  p-4
                  font-semibold
                  text-white
                  transition
                  active:scale-95
                "
              >
                Исполнить желание 🎁
              </button>


            ) : null}


          </div>



        </div>


      </div>


    </AnimatedCard>

  );

}