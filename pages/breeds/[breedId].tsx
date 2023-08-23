import { useRouter } from 'next/router';


function DetailPage() {
    const router = useRouter();
    const breedId = router.query.breedId;


return <div>Detail Page</div>;

}

export default DetailPage;