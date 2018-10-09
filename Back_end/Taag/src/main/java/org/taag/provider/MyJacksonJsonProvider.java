package org.taag.provider;

import javax.ws.rs.ext.ContextResolver;

import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

public class MyJacksonJsonProvider implements ContextResolver<ObjectMapper>{

private static final ObjectMapper MAPPER = new ObjectMapper();
    
    static {
      MAPPER.setSerializationInclusion(Include.NON_EMPTY);
      MAPPER.disable(MapperFeature.USE_GETTERS_AS_SETTERS);
      MAPPER.setVisibility(PropertyAccessor.ALL, Visibility.NONE);
      MAPPER.setVisibility(PropertyAccessor.FIELD, Visibility.ANY);
      //MAPPER.disable(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY);
    }
 
    public MyJacksonJsonProvider() {
        System.out.println("Instantiate MyJacksonJsonProvider");
    }

	public ObjectMapper getContext(Class<?> type) {
		System.out.println("MyJacksonProvider.getContext() called with type: "+type);
      return MAPPER;
	}
     
//    @Override
//    public ObjectMapper getContext(Class<?> type) {
//        System.out.println("MyJacksonProvider.getContext() called with type: "+type);
//        return MAPPER;
//    } 

}
