
import streamlit as st
import pandas as pd

# Load the Excel file
@st.cache_data
def load_data(file_path):
    data = pd.read_excel(file_path)
    # Clean data by removing empty columns
    return data.dropna(axis=1, how='all')

# Pagination function
def paginate_data(data, page, rows_per_page):
    start_row = page * rows_per_page
    end_row = start_row + rows_per_page
    return data.iloc[start_row:end_row]

# Main app
def main():
    st.title("Interactive Dashboard")
    
    # File uploader
    uploaded_file = st.file_uploader("Upload your Excel file", type=["xlsx"])
    if uploaded_file:
        data = load_data(uploaded_file)
        st.success("File loaded successfully!")
        
        # Display column names
        st.subheader("Columns in Dataset")
        st.write(data.columns.tolist())

        # Filter options
        st.sidebar.subheader("Filter Options")
        column_to_filter = st.sidebar.selectbox("Select Column to Filter", data.columns)
        filter_value = st.sidebar.text_input(f"Enter value to filter '{column_to_filter}'")
        
        filtered_data = data
        if filter_value:
            filtered_data = data[data[column_to_filter].astype(str).str.contains(filter_value, na=False)]
        
        # Pagination options
        st.sidebar.subheader("Pagination")
        rows_per_page = st.sidebar.slider("Rows per page", 5, 50, 10)
        page = st.sidebar.number_input("Page", min_value=0, max_value=(len(filtered_data) // rows_per_page), step=1)
        
        # Display filtered and paginated data
        paginated_data = paginate_data(filtered_data, page, rows_per_page)
        st.subheader("Filtered and Paginated Data")
        st.dataframe(paginated_data)
        
        # Basic visualizations
        st.subheader("Visualizations")
        if "Status" in data.columns:
            st.bar_chart(filtered_data["Status"].value_counts())
        if "Owner" in data.columns:
            st.bar_chart(filtered_data["Owner"].value_counts())

if __name__ == "__main__":
    main()
