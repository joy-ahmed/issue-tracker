import prisma from '@/prisma/client'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import FormLoadingSkeliton from '../../_components/FormLoadingSkeliton'
const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), { ssr: false, 
    loading: () => <FormLoadingSkeliton />
 })

interface Props {
    params: { id: string }
}

const IssueEditPage = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: {
            id: params.id
        }
    })
    if(!issue) notFound();

    return (
        <IssueForm issue={issue} />
    )
}

export default IssueEditPage
