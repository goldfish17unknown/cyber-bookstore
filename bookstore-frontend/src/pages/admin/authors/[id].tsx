import AuthorEditModal from "@/components/custom/admin/authors/AuthorEditModal";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { NextPageWithLayout } from "@/pages/_app";
import { Author } from "@/types/common";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AuthorsDetailPage: NextPageWithLayout = () => {
    const [author, setAuthor] = useState<Author | null>(null);
    const [showFullBio, setShowFullBio] = useState<boolean>(false);

    const tempString: string = "Lorem Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio tempora nihil eum ab nulla commodi vel aliquid adipisci, pariatur cumque animi eaque esse fuga dolor quibusdam minima deserunt tenetur excepturi consequatur beatae? Soluta maxime quasi eaque molestiae ratione! Architecto, nobis voluptate id blanditiis quo delectus doloribus beatae reiciendis molestiae reprehenderit debitis nesciunt vero non iusto dignissimos deserunt eligendi sed ut. Ad tenetur voluptate necessitatibus, labore ipsam distinctio aspernatur similique veniam quis nobis dolorem quia suscipit assumenda? Recusandae totam adipisci alias architecto nihil cumque esse provident! Delectus culpa totam dicta architecto! Quos corrupti sint ipsam nemo provident quis beatae! Officia doloribus dolorum, facere quisquam deleniti nihil modi vitae aut tempore maxime omnis odio sapiente ducimus sunt provident rerum? Voluptate totam nam incidunt dolor id qui ut. Aliquam eum nam numquam, expedita quos iusto placeat delectus incidunt accusamus facere reiciendis quasi cumque ab enim autem voluptates quibusdam, in rem quo, optio earum. Soluta, distinctio ducimus, explicabo ut sequi voluptatibus corporis magni voluptates ullam deleniti ab omnis sed neque architecto facilis debitis quis dignissimos animi natus exercitationem modi voluptas at tenetur dolorem. Doloribus, totam perspiciatis alias eligendi nesciunt eos quis, placeat aspernatur vero veniam unde cum ut nobis id. Modi corrupti enim in? Numquam rerum maxime quisquam impedit voluptatibus dolore ipsum dignissimos, voluptas nemo molestias tenetur vel et ratione nisi! Quisquam cupiditate eum facere sit est distinctio molestias. Repellendus eum possimus quia beatae error unde corporis natus, quos recusandae nisi dolores debitis ea quae libero magnam voluptates molestiae ratione incidunt dolore quisquam quod aperiam sint at! Ducimus fugit, fuga corporis consequatur eaque totam minima, harum, ipsum consequuntur illum facilis magni laborum nesciunt voluptatem nihil veniam ad ullam iusto doloremque eos blanditiis rem voluptatibus? Ratione debitis eos dolor esse molestiae, suscipit culpa voluptas, exercitationem dolore sed est beatae officiis, harum fugit in? Explicabo cupiditate praesentium ab doloremque. Nihil molestias cum animi, in amet sint possimus ratione sunt vitae quasi inventore corrupti maiores minus impedit nisi eligendi laboriosam adipisci repellendus assumenda pariatur dolorem autem dignissimos magni! Expedita quaerat quas, illo ab, voluptas libero, non a asperiores consequuntur tempore incidunt animi error commodi aperiam ut quis magni eius illum aut optio accusantium nesciunt enim autem necessitatibus? Nobis quo repellat quae perferendis iste eius quaerat optio alias, ipsa illum sed. Cum amet sequi quibusdam nisi eum accusamus rerum perspiciatis, vero voluptate corporis corrupti quam et, ipsam eius facilis alias debitis non? Asperiores dolorem delectus, assumenda incidunt harum molestias rem! Adipisci, non. Dolorem, quis neque sit veniam, enim culpa aut sint quisquam, aliquid vel minima consequuntur? Facilis voluptatibus esse at pariatur totam quam consequatur laborum ad, consequuntur quae! Fugit consequuntur corporis sed voluptatibus, similique est debitis fugiat id sequi, tenetur impedit consequatur repudiandae, amet voluptates! Provident aliquam aut exercitationem eum, cumque blanditiis laudantium! Voluptates corrupti molestiae aspernatur beatae, quasi ut maiores saepe qui ipsam officiis iusto officia ratione reprehenderit incidunt ex. Ab, distinctio? Suscipit inventore saepe dicta ad. Aliquid consectetur esse, cumque, nostrum quia nisi facilis qui hic exercitationem non quod veritatis ipsum officiis fugit. A dolore vero libero deserunt natus fuga quisquam repudiandae nam odio consequatur fugiat sed eligendi, vitae eius fugit magnam hic vel quas adipisci similique officiis repellat ut consequuntur. Suscipit possimus accusamus incidunt? Possimus ipsam, rem eum eos, repellat aliquid qui hic natus modi nulla ut aperiam, cupiditate sequi temporibus optio iste. Animi quasi ut, praesentium minus eum iure repudiandae nam aperiam officia quam neque aliquid ducimus molestiae culpa, quas at dicta! Fugiat ipsam suscipit quam deleniti illo omnis officiis vitae ad dolorum a, modi eveniet facilis inventore reiciendis qui tenetur sed quasi assumenda, rerum eum error unde consectetur. Tenetur consequuntur fuga repellat ex quae architecto, perspiciatis ullam dolore, laudantium eaque quis praesentium expedita doloribus porro aut excepturi facere molestiae sapiente nemo illo. Excepturi, assumenda! Reprehenderit sint dolorem cupiditate ad tempore possimus nostrum. Quam nostrum impedit minima possimus eius nobis ipsa quaerat maiores repudiandae id, qui aliquid fuga reprehenderit optio quas rerum at, quos distinctio. Recusandae ipsam iste perspiciatis veniam omnis similique. Accusamus corporis vitae blanditiis similique fugit? Optio, corporis distinctio? Obcaecati magni necessitatibus voluptates dolorem? Et, quas. Perferendis numquam omnis quod nulla! Quisquam laborum repellat dolores ipsum sequi voluptas perspiciatis maxime, vel ullam debitis velit! Aperiam cupiditate pariatur totam neque! Non sint ad delectus, sit corrupti magni libero quaerat a temporibus, ut nulla porro consectetur nemo fugiat ipsam consequuntur. Maiores totam voluptatibus expedita quod repellendus, eos voluptatum nobis cum exercitationem assumenda facere pariatur quidem magnam nesciunt dolor cupiditate itaque dolorem eligendi ullam ducimus cumque architecto. Aut dolorem similique voluptas repellendus enim vero ratione dolores eius praesentium voluptatem! Iure, nisi ratione. Minima corporis soluta animi error ad porro perferendis nulla laborum? Nobis facilis sit rerum modi optio, iste fuga cumque. Rerum, cupiditate. Eaque dolore odio est, ea quos aliquam vel mollitia ad autem illum aspernatur voluptas harum quam unde, inventore doloremque aut, id animi.";
    
    const router = useRouter();
    const { id } = router.query;

    const toggleText = () => {
        setShowFullBio(!showFullBio);
    }

    useEffect(() => {
        fetchAuthorData();

    }, [])

    const fetchAuthorData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authors/${id}`);
            if(!response.ok){
                throw new Error('Failed to fetch author data.');
            }
            const data = await response.json();
            setAuthor(data);
        } catch (error) {
            //TODO:: to do something with the error
            console.log(error);
        }
    }

    return (
        <div>
            <section className="p-5 h-auto grid grid-cols-7 border-b-2 border-gray-200">
                {/*  Left side image */}
                <div className="md:col-span-2 col-span-7">
                    
                    <img src={author?.image ? `http://localhost:8000/${author.image}` : "/placeholders/user-placeholder.png"} alt="author-image"
                    className="rounded-full w-64 h-64" />
                </div>
                {/*  right side name and bio  and edit and delete button */}
                <div className="md:col-span-4 col-span-7 mt-6 ms-4">
                    <div>
                        <h1 className="md:text-4xl text-3xl font-bold my-4">{ author?.name }</h1>
                        <p>
                           
                            { showFullBio ? author?.bio : author?.bio.slice(0, 300) }
                            {author?.bio && author.bio.length > 300 && (
                                <span onClick={toggleText} className="text-gray-600 hover:cursor-pointer">
                                {showFullBio ? " Show less..." : " Show more..."}
                            </span>
                            )}
                        </p>
                    </div>
                    <div className="flex justify-end mt-4">
                        <Button variant={"yellow"} className="ms-4">Edit</Button>
                        {/* <AuthorEditModal /> */}
                        <Button variant={"red"} className="ms-4">Delete</Button>
                    </div>
                    
                </div>

            </section>
            <section>
                
            </section>
        </div>
    )
}


AuthorsDetailPage.getLayout = function getLayout(page) {
    return (
        <AdminLayout>
            {page}
        </ AdminLayout>
    )
}

export default AuthorsDetailPage;