import { useEffect, useState } from "react";
import styles from "./CategoryPage.module.css";
import { APICategoryResultWrapper, BasicPersonInfo, CategoryData, CategorySearchResult, SEARCH_TYPE } from "../consts/dataTypes";
import Button from "../components/Button/Button";
import useAPI from "../hooks/useAPI";
import FormField from "../components/FormField/FormField";

interface CategoryPageInterface {
  goBack: () => void;
  categoryData: CategoryData;
}

const CategoryPage: React.FC<CategoryPageInterface> = ({ goBack, categoryData }) => {
  const [isShowLoadMoreButtonVisible, setIsShowLoadMoreButtonVisible] = useState(false);
  const [people, setPeople] = useState<BasicPersonInfo[]>([]);
  const [activePerson, setActivePerson] = useState<BasicPersonInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const searchString = categoryData ? categoryData.searchString : "";
  const { searchResults, loading, error } = useAPI<APICategoryResultWrapper<CategorySearchResult>>(searchString, SEARCH_TYPE.PEOPLE, page, page === 1);

  useEffect(() => {
    if (categoryData) {
      setPeople(categoryData.data);
      if (categoryData.totalItems && categoryData.data.length < categoryData.totalItems) {
        setIsShowLoadMoreButtonVisible(true);
      }
    }
  }, []);

  useEffect(() => {
    if (page > 1) {
      setIsShowLoadMoreButtonVisible(!!searchResults?.next);
    }
    if (searchResults && searchResults.results.length > 0) {
      setPeople((prevPeople) => [...prevPeople, ...searchResults.results]);
    }
  }, [JSON.stringify(searchResults)]);

  const handleDelete = (url: string) => {
    const newPeopleListAfterDelete = people.filter((person) => person.url !== url);
    setPeople(newPeopleListAfterDelete);
  };

  const handleEdit = (person: BasicPersonInfo) => {
    setActivePerson(person);
    setIsModalOpen(true); // Open modal when editing
  };

  const handleAdd = () => {
    setActivePerson({
      birth_year: "",
      eye_color: "",
      gender: "",
      hair_color: "",
      height: "",
      homeworld: "",
      mass: "",
      name: "",
      skin_color: "",
      created: "",
      edited: "",
      url: Math.random().toString(),
    });
    setIsModalOpen(true); // Open modal when adding a new person
  };

  const handleCancel = () => {
    setActivePerson(null);
    setIsModalOpen(false); // Close modal
  };

  const loadMoreEntities = () => {
    setPage((prevPage) => prevPage + 1); // Increment page to fetch the next set of results
  };
  const handleSave = (person: BasicPersonInfo) => {
    setPeople((prevPeople) => {
      const exists = prevPeople.some((p) => p.url === person.url);
      return exists ? prevPeople.map((p) => (p.url === person.url ? person : p)) : [...prevPeople, person];
    });
    setActivePerson(null);
    setIsModalOpen(false); // Close modal after saving
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedPerson: BasicPersonInfo = {
      ...activePerson!,
      name: formData.get("name") as string,
      birth_year: formData.get("birth_year") as string,
      eye_color: formData.get("eye_color") as string,
      gender: formData.get("gender") as string,
      hair_color: formData.get("hair_color") as string,
      height: formData.get("height") as string,
      homeworld: formData.get("homeworld") as string,
      mass: formData.get("mass") as string,
      skin_color: formData.get("skin_color") as string,
      created: activePerson?.created || new Date().toISOString(),
      edited: new Date().toISOString(),
      url: activePerson?.url || Math.random().toString(),
    };
    handleSave(updatedPerson);
  };

  return (
    <div className={styles.categoryWrapper}>
      <h1 className={styles.title}>Edit {categoryData?.name} entries</h1>
      <div className={styles.container}>
        <Button variant="secondary" onClick={goBack}>
          Go Back
        </Button>
        {categoryData?.name === "people" && (
          <Button variant="primary" onClick={handleAdd}>
            Add New Person
          </Button>
        )}

        {categoryData?.name === "people" && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Birth Year</th>
                <th scope="col">Eye Color</th>
                <th scope="col">Gender</th>
                <th scope="col">Hair Color</th>
                <th scope="col">Height</th>
                <th scope="col">Mass</th>
                <th scope="col">Skin Color</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {people.map((person) => (
                <tr key={person.url}>
                  <td>{person.name}</td>
                  <td>{person.birth_year}</td>
                  <td>{person.eye_color}</td>
                  <td>{person.gender}</td>
                  <td>{person.hair_color}</td>
                  <td>{person.height}</td>
                  <td>{person.mass}</td>
                  <td>{person.skin_color}</td>
                  <td>
                    <Button variant="link" onClick={() => handleEdit(person)}>
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(person.url)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {categoryData?.name === "people" && (
          <p>
            <span>
              Showing {people.length} out of {Math.max(categoryData?.totalItems as number, people.length)} entities
            </span>
            {isShowLoadMoreButtonVisible && (
              <Button onClick={loadMoreEntities} loading={loading} variant="secondary">
                Load More
              </Button>
            )}
          </p>
        )}
        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h3>{activePerson ? "Edit Person" : "Add New Person"}</h3>
              <form onSubmit={handleFormSubmit} aria-describedby="modalForm">
                <div className={styles.formFields}>
                  <FormField label="Name" name="name" defaultValue={activePerson?.name} required />
                  <FormField label="Birth Year" name="birth_year" defaultValue={activePerson?.birth_year} required />
                  <FormField label="Eye Color" name="eye_color" defaultValue={activePerson?.eye_color} />
                  <FormField label="Gender" name="gender" defaultValue={activePerson?.gender} />
                  <FormField label="Hair Color" name="hair_color" defaultValue={activePerson?.hair_color} />
                  <FormField label="Height" name="height" defaultValue={activePerson?.height} />
                  <FormField label="Homeworld" name="homeworld" defaultValue={activePerson?.homeworld} />
                  <FormField label="Mass" name="mass" defaultValue={activePerson?.mass} />
                  <FormField label="Skin Color" name="skin_color" defaultValue={activePerson?.skin_color} />
                </div>
                <div className={styles.actionsRow}>
                  <Button aria-label="Save Person" type="submit" variant="primary">
                    Save
                  </Button>
                  <Button type="button" aria-label="Cancel" variant="secondary" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
