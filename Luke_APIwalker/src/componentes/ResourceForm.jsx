import React, { useMemo } from 'react';

const ResourceForm = ({ handleSubmit, handleChange, id, error, showErrorImage, obiWanImage, data }) => {
    const renderData = useMemo(() => {
        if (!data) return null;

        if (Array.isArray(data)) {
            return (

                <ul>
                    {data.map((item, index) => (
                        <li li key={index} >
                            {
                                Object.keys(item).map((key) => (
                                    <p key={key}>
                                        <strong>{key}: </strong> {item[key]}
                                    </p>
                                ))
                            }
                        </li>
                    ))
                    }
                </ul >
            );
        }

        return (
            <ul>
                {Object.keys(data).map((key) => (
                    <li key={key}>
                        <strong>{key}: </strong> {data[key]}
                    </li>
                ))
                }
            </ul>
        );
    }, [data]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={id} onChange={handleChange} />
                <button type="submit">Search</button>
            </form>
            {error && (
                <div>
                    <p>{error}</p>
                    {showErrorImage && <img src={obiWanImage} alt="Obi-Wan Kenobi" />}
                </div>
            )}
            {renderData}
        </div>
    );
};

export default ResourceForm;
