import { CategoryForm } from "../components/category-form"


const CategoryPage = async () => {

    return(
        <div className="flex-col">
            <div className="space-y-4 p-8 pt-6">
                <CategoryForm/>
            </div>
        </div>
    );
}

export default CategoryPage;