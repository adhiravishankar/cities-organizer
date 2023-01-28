package com.adhiravishankar.citiesorganizer.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("pics")
public class Picture {

    @Id
    String ID;

    @Field("attribute_id")
    String AttributeID;

    @Field("URL")
    String URL;

    public Picture() {
    }

    public String getID() {
        return ID;
    }

    public void setID(String ID) {
        this.ID = ID;
    }

    public String getAttributeID() {
        return AttributeID;
    }

    public void setAttributeID(String attributeID) {
        AttributeID = attributeID;
    }

    public String getURL() {
        return URL;
    }

    public void setURL(String URL) {
        this.URL = URL;
    }
}
