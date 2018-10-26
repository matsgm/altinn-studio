/* 
 * Gitea API.
 *
 * This documentation describes the Gitea API.
 *
 * OpenAPI spec version: 1.1.1
 * 
 * Generated by: https://github.com/swagger-api/swagger-codegen.git
 */

using System;
using System.Linq;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Runtime.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.ComponentModel.DataAnnotations;
using SwaggerDateConverter = AltinnCore.RepositoryClient.Client.SwaggerDateConverter;

namespace AltinnCore.RepositoryClient.Model
{
    /// <summary>
    /// CreateRepoOption options when creating repository
    /// </summary>
    [DataContract]
    public partial class CreateRepoOption :  IEquatable<CreateRepoOption>, IValidatableObject
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="CreateRepoOption" /> class.
        /// </summary>
        [JsonConstructorAttribute]
        protected CreateRepoOption() { }
        /// <summary>
        /// Initializes a new instance of the <see cref="CreateRepoOption" /> class.
        /// </summary>
        /// <param name="AutoInit">Whether the repository should be auto-intialized?.</param>
        /// <param name="Description">Description of the repository to create.</param>
        /// <param name="Gitignores">Gitignores to use.</param>
        /// <param name="License">License to use.</param>
        /// <param name="Name">Name of the repository to create (required).</param>
        /// <param name="_Private">Whether the repository is private.</param>
        /// <param name="Readme">Readme of the repository to create.</param>
        public CreateRepoOption(bool? AutoInit = default(bool?), string Description = default(string), string Gitignores = default(string), string License = default(string), string Name = default(string), bool? _Private = default(bool?), string Readme = default(string))
        {
            // to ensure "Name" is required (not null)
            if (Name == null)
            {
                throw new InvalidDataException("Name is a required property for CreateRepoOption and cannot be null");
            }
            else
            {
                this.Name = Name;
            }
            this.AutoInit = AutoInit;
            this.Description = Description;
            this.Gitignores = Gitignores;
            this.License = License;
            this._Private = _Private;
            this.Readme = Readme;
        }
        
        /// <summary>
        /// Whether the repository should be auto-intialized?
        /// </summary>
        /// <value>Whether the repository should be auto-intialized?</value>
        [DataMember(Name="auto_init", EmitDefaultValue=false)]
        public bool? AutoInit { get; set; }

        /// <summary>
        /// Description of the repository to create
        /// </summary>
        /// <value>Description of the repository to create</value>
        [DataMember(Name="description", EmitDefaultValue=false)]
        public string Description { get; set; }

        /// <summary>
        /// Gitignores to use
        /// </summary>
        /// <value>Gitignores to use</value>
        [DataMember(Name="gitignores", EmitDefaultValue=false)]
        public string Gitignores { get; set; }

        /// <summary>
        /// License to use
        /// </summary>
        /// <value>License to use</value>
        [DataMember(Name="license", EmitDefaultValue=false)]
        public string License { get; set; }

        /// <summary>
        /// Name of the repository to create
        /// </summary>
        /// <value>Name of the repository to create</value>
        [DataMember(Name="name", EmitDefaultValue=false)]
        public string Name { get; set; }

        /// <summary>
        /// Whether the repository is private
        /// </summary>
        /// <value>Whether the repository is private</value>
        [DataMember(Name="private", EmitDefaultValue=false)]
        public bool? _Private { get; set; }

        /// <summary>
        /// Readme of the repository to create
        /// </summary>
        /// <value>Readme of the repository to create</value>
        [DataMember(Name="readme", EmitDefaultValue=false)]
        public string Readme { get; set; }

        /// <summary>
        /// Returns the string presentation of the object
        /// </summary>
        /// <returns>String presentation of the object</returns>
        public override string ToString()
        {
            var sb = new StringBuilder();
            sb.Append("class CreateRepoOption {\n");
            sb.Append("  AutoInit: ").Append(AutoInit).Append("\n");
            sb.Append("  Description: ").Append(Description).Append("\n");
            sb.Append("  Gitignores: ").Append(Gitignores).Append("\n");
            sb.Append("  License: ").Append(License).Append("\n");
            sb.Append("  Name: ").Append(Name).Append("\n");
            sb.Append("  _Private: ").Append(_Private).Append("\n");
            sb.Append("  Readme: ").Append(Readme).Append("\n");
            sb.Append("}\n");
            return sb.ToString();
        }
  
        /// <summary>
        /// Returns the JSON string presentation of the object
        /// </summary>
        /// <returns>JSON string presentation of the object</returns>
        public string ToJson()
        {
            return JsonConvert.SerializeObject(this, Formatting.Indented);
        }

        /// <summary>
        /// Returns true if objects are equal
        /// </summary>
        /// <param name="input">Object to be compared</param>
        /// <returns>Boolean</returns>
        public override bool Equals(object input)
        {
            return this.Equals(input as CreateRepoOption);
        }

        /// <summary>
        /// Returns true if CreateRepoOption instances are equal
        /// </summary>
        /// <param name="input">Instance of CreateRepoOption to be compared</param>
        /// <returns>Boolean</returns>
        public bool Equals(CreateRepoOption input)
        {
            if (input == null)
                return false;

            return 
                (
                    this.AutoInit == input.AutoInit ||
                    (this.AutoInit != null &&
                    this.AutoInit.Equals(input.AutoInit))
                ) && 
                (
                    this.Description == input.Description ||
                    (this.Description != null &&
                    this.Description.Equals(input.Description))
                ) && 
                (
                    this.Gitignores == input.Gitignores ||
                    (this.Gitignores != null &&
                    this.Gitignores.Equals(input.Gitignores))
                ) && 
                (
                    this.License == input.License ||
                    (this.License != null &&
                    this.License.Equals(input.License))
                ) && 
                (
                    this.Name == input.Name ||
                    (this.Name != null &&
                    this.Name.Equals(input.Name))
                ) && 
                (
                    this._Private == input._Private ||
                    (this._Private != null &&
                    this._Private.Equals(input._Private))
                ) && 
                (
                    this.Readme == input.Readme ||
                    (this.Readme != null &&
                    this.Readme.Equals(input.Readme))
                );
        }

        /// <summary>
        /// Gets the hash code
        /// </summary>
        /// <returns>Hash code</returns>
        public override int GetHashCode()
        {
            unchecked // Overflow is fine, just wrap
            {
                int hashCode = 41;
                if (this.AutoInit != null)
                    hashCode = hashCode * 59 + this.AutoInit.GetHashCode();
                if (this.Description != null)
                    hashCode = hashCode * 59 + this.Description.GetHashCode();
                if (this.Gitignores != null)
                    hashCode = hashCode * 59 + this.Gitignores.GetHashCode();
                if (this.License != null)
                    hashCode = hashCode * 59 + this.License.GetHashCode();
                if (this.Name != null)
                    hashCode = hashCode * 59 + this.Name.GetHashCode();
                if (this._Private != null)
                    hashCode = hashCode * 59 + this._Private.GetHashCode();
                if (this.Readme != null)
                    hashCode = hashCode * 59 + this.Readme.GetHashCode();
                return hashCode;
            }
        }

        /// <summary>
        /// To validate all properties of the instance
        /// </summary>
        /// <param name="validationContext">Validation context</param>
        /// <returns>Validation Result</returns>
        IEnumerable<System.ComponentModel.DataAnnotations.ValidationResult> IValidatableObject.Validate(ValidationContext validationContext)
        {
            yield break;
        }
    }

}